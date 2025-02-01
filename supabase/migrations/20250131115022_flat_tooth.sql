/*
  # Add manufacturer search functionality

  1. New Functions
    - Search manufacturers by various criteria
    - Calculate distance between locations
    - Get manufacturer ratings and reviews
  
  2. Indexes
    - Add GiST index for location-based search
    - Add indexes for full-text search
    
  3. Views
    - Create materialized view for manufacturer search results
*/

-- Enable the required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;

-- Create indexes for search
CREATE INDEX IF NOT EXISTS idx_manufacturers_company_name_trgm ON manufacturers USING GIN (company_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_manufacturer_locations_coords ON manufacturer_locations USING gist (ll_to_earth(latitude, longitude));
CREATE INDEX IF NOT EXISTS idx_manufacturer_products_name_trgm ON manufacturer_products USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_manufacturer_products_category_trgm ON manufacturer_products USING GIN (category gin_trgm_ops);

-- Create a function to search manufacturers
CREATE OR REPLACE FUNCTION search_manufacturers(
  search_query text DEFAULT NULL,
  category_filter text DEFAULT NULL,
  lat double precision DEFAULT NULL,
  lon double precision DEFAULT NULL,
  max_distance integer DEFAULT 100, -- in kilometers
  min_rating numeric DEFAULT NULL,
  verified_only boolean DEFAULT false
)
RETURNS TABLE (
  id uuid,
  company_name text,
  description text,
  rating numeric,
  review_count integer,
  verified boolean,
  distance numeric,
  categories text[],
  location_city text,
  location_state text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH manufacturer_categories AS (
    SELECT DISTINCT
      manufacturer_id,
      array_agg(category) as categories
    FROM manufacturer_products
    GROUP BY manufacturer_id
  ),
  manufacturer_locations AS (
    SELECT DISTINCT ON (manufacturer_id)
      manufacturer_id,
      city,
      state,
      latitude,
      longitude,
      CASE
        WHEN lat IS NOT NULL AND lon IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL
        THEN (point(lon, lat) <@> point(longitude, latitude))
        ELSE NULL
      END as distance
    FROM manufacturer_locations
    WHERE is_primary = true
  )
  SELECT
    m.id,
    m.company_name,
    m.description,
    m.rating,
    m.review_count,
    m.verified,
    ml.distance,
    mc.categories,
    ml.city,
    ml.state
  FROM manufacturers m
  LEFT JOIN manufacturer_categories mc ON mc.manufacturer_id = m.id
  LEFT JOIN manufacturer_locations ml ON ml.manufacturer_id = m.id
  WHERE
    (search_query IS NULL OR 
     m.company_name ILIKE '%' || search_query || '%' OR
     m.description ILIKE '%' || search_query || '%')
    AND (category_filter IS NULL OR 
         EXISTS (
           SELECT 1 FROM manufacturer_products mp 
           WHERE mp.manufacturer_id = m.id 
           AND mp.category ILIKE '%' || category_filter || '%'
         ))
    AND (min_rating IS NULL OR m.rating >= min_rating)
    AND (NOT verified_only OR m.verified = true)
    AND (
      lat IS NULL OR 
      lon IS NULL OR 
      ml.distance IS NULL OR 
      ml.distance <= max_distance
    )
  ORDER BY
    CASE
      WHEN lat IS NOT NULL AND lon IS NOT NULL THEN ml.distance
      ELSE 0
    END ASC,
    m.rating DESC,
    m.review_count DESC;
END;
$$;

-- Create a function to get manufacturer details
CREATE OR REPLACE FUNCTION get_manufacturer_details(manufacturer_id uuid)
RETURNS TABLE (
  id uuid,
  company_name text,
  description text,
  website text,
  contact_email text,
  contact_phone text,
  rating numeric,
  review_count integer,
  verified boolean,
  subscription_tier text,
  locations jsonb,
  products jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.company_name,
    m.description,
    m.website,
    m.contact_email,
    m.contact_phone,
    m.rating,
    m.review_count,
    m.verified,
    m.subscription_tier,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', l.id,
            'name', l.name,
            'city', l.city,
            'state', l.state,
            'country', l.country,
            'is_primary', l.is_primary
          )
        )
        FROM manufacturer_locations l
        WHERE l.manufacturer_id = m.id
      ),
      '[]'::jsonb
    ) as locations,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', p.id,
            'name', p.name,
            'category', p.category,
            'specifications', p.specifications,
            'materials', p.materials,
            'lead_time_days', p.lead_time_days
          )
        )
        FROM manufacturer_products p
        WHERE p.manufacturer_id = m.id
        AND p.is_active = true
      ),
      '[]'::jsonb
    ) as products
  FROM manufacturers m
  WHERE m.id = manufacturer_id;
END;
$$;

-- Create a materialized view for fast search results
CREATE MATERIALIZED VIEW IF NOT EXISTS manufacturer_search_view AS
SELECT
  m.id,
  m.company_name,
  m.description,
  m.rating,
  m.review_count,
  m.verified,
  array_agg(DISTINCT mp.category) as categories,
  jsonb_agg(
    DISTINCT jsonb_build_object(
      'city', ml.city,
      'state', ml.state,
      'latitude', ml.latitude,
      'longitude', ml.longitude
    )
  ) as locations
FROM manufacturers m
LEFT JOIN manufacturer_products mp ON mp.manufacturer_id = m.id
LEFT JOIN manufacturer_locations ml ON ml.manufacturer_id = m.id
GROUP BY m.id, m.company_name, m.description, m.rating, m.review_count, m.verified;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_manufacturer_search_view_id ON manufacturer_search_view (id);
CREATE INDEX IF NOT EXISTS idx_manufacturer_search_view_company_name ON manufacturer_search_view USING GIN (company_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_manufacturer_search_view_categories ON manufacturer_search_view USING GIN (categories);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_manufacturer_search_view()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY manufacturer_search_view;
  RETURN NULL;
END;
$$;

-- Create triggers to refresh the materialized view
CREATE TRIGGER refresh_manufacturer_search_view_manufacturers
AFTER INSERT OR UPDATE OR DELETE ON manufacturers
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_manufacturer_search_view();

CREATE TRIGGER refresh_manufacturer_search_view_products
AFTER INSERT OR UPDATE OR DELETE ON manufacturer_products
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_manufacturer_search_view();

CREATE TRIGGER refresh_manufacturer_search_view_locations
AFTER INSERT OR UPDATE OR DELETE ON manufacturer_locations
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_manufacturer_search_view();