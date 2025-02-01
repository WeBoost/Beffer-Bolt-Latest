/*
  # Add Installation Pricing Schema

  1. New Tables
    - `installation_zones`: Geographic zones for installation pricing
    - `supplier_installation_settings`: Supplier preferences for installation services
    - `installation_pricing`: Price rules for different zones and door types

  2. Changes
    - Add installation-related fields to existing door configurations

  3. Security
    - Enable RLS on new tables
    - Add policies for supplier access
*/

-- Installation zones for pricing
CREATE TABLE IF NOT EXISTS installation_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  radius_km numeric NOT NULL,
  base_location_lat numeric(10,8),
  base_location_lon numeric(11,8),
  what3words text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Supplier installation preferences
CREATE TABLE IF NOT EXISTS supplier_installation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES users(id) NOT NULL,
  offers_installation boolean DEFAULT false,
  max_travel_distance_km numeric DEFAULT 50,
  min_installation_fee numeric(10,2),
  travel_fee_per_km numeric(10,2),
  installation_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(supplier_id)
);

-- Installation pricing rules
CREATE TABLE IF NOT EXISTS installation_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES users(id) NOT NULL,
  zone_id uuid REFERENCES installation_zones(id) NOT NULL,
  door_type text NOT NULL,
  base_price numeric(10,2) NOT NULL,
  price_per_door numeric(10,2),
  minimum_doors integer DEFAULT 1,
  volume_discounts jsonb DEFAULT '[]',
  conditions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add installation fields to door configurations
ALTER TABLE door_configurations
ADD COLUMN IF NOT EXISTS requires_installation boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS installation_location_lat numeric(10,8),
ADD COLUMN IF NOT EXISTS installation_location_lon numeric(11,8),
ADD COLUMN IF NOT EXISTS installation_what3words text,
ADD COLUMN IF NOT EXISTS installation_notes text,
ADD COLUMN IF NOT EXISTS installation_price numeric(10,2);

-- Enable Row Level Security
ALTER TABLE installation_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_installation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE installation_pricing ENABLE ROW LEVEL SECURITY;

-- Installation zones policies
CREATE POLICY "Suppliers can manage own zones"
  ON installation_zones
  FOR ALL TO authenticated
  USING (supplier_id = auth.uid());

CREATE POLICY "Public can view zones"
  ON installation_zones
  FOR SELECT TO authenticated
  USING (true);

-- Installation settings policies
CREATE POLICY "Suppliers can manage own settings"
  ON supplier_installation_settings
  FOR ALL TO authenticated
  USING (supplier_id = auth.uid());

CREATE POLICY "Public can view settings"
  ON supplier_installation_settings
  FOR SELECT TO authenticated
  USING (true);

-- Installation pricing policies
CREATE POLICY "Suppliers can manage own pricing"
  ON installation_pricing
  FOR ALL TO authenticated
  USING (supplier_id = auth.uid());

CREATE POLICY "Public can view pricing"
  ON installation_pricing
  FOR SELECT TO authenticated
  USING (true);

-- Function to calculate installation price
CREATE OR REPLACE FUNCTION calculate_installation_price(
  supplier_id uuid,
  door_type text,
  location_lat numeric,
  location_lon numeric,
  what3words text,
  door_count integer DEFAULT 1
)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  supplier_settings supplier_installation_settings%ROWTYPE;
  nearest_zone installation_zones%ROWTYPE;
  zone_pricing installation_pricing%ROWTYPE;
  distance numeric;
  total_price numeric := 0;
BEGIN
  -- Get supplier settings
  SELECT * INTO supplier_settings
  FROM supplier_installation_settings
  WHERE supplier_installation_settings.supplier_id = calculate_installation_price.supplier_id;

  IF NOT FOUND OR NOT supplier_settings.offers_installation THEN
    RETURN NULL;
  END IF;

  -- Find nearest installation zone
  SELECT *,
    point(location_lon, location_lat) <@> point(base_location_lon, base_location_lat) as distance
  INTO nearest_zone
  FROM installation_zones
  WHERE installation_zones.supplier_id = calculate_installation_price.supplier_id
  ORDER BY distance
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Get pricing for zone and door type
  SELECT * INTO zone_pricing
  FROM installation_pricing
  WHERE installation_pricing.supplier_id = calculate_installation_price.supplier_id
  AND zone_id = nearest_zone.id
  AND door_type = calculate_installation_price.door_type;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Calculate base price
  total_price := zone_pricing.base_price + (zone_pricing.price_per_door * door_count);

  -- Add travel fee
  IF supplier_settings.travel_fee_per_km > 0 THEN
    total_price := total_price + (nearest_zone.distance * supplier_settings.travel_fee_per_km);
  END IF;

  -- Apply volume discounts
  IF door_count > 1 AND zone_pricing.volume_discounts IS NOT NULL THEN
    -- Apply discount logic here
    NULL;
  END IF;

  RETURN GREATEST(total_price, supplier_settings.min_installation_fee);
END;
$$;