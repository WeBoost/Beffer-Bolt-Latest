/*
  # Manufacturer Marketplace Schema

  1. New Tables
    - `manufacturers` - Stores manufacturer profiles and package subscriptions
    - `manufacturer_locations` - Physical locations of manufacturers
    - `manufacturer_products` - Products offered by manufacturers
    - `manufacturer_pricing` - Pricing rules for manufacturer products
    - `supplier_settings` - Supplier preferences and markup settings
    - `supplier_manufacturer_links` - Connections between suppliers and manufacturers
    - `pricing_components` - Default component pricing
    - `pricing_rules` - Complex pricing rules and conditions

  2. Security
    - Enable RLS on all tables
    - Policies for manufacturers, suppliers, and admins
    - Masked location data for end users

  3. Changes
    - Add manufacturer references to existing tables
    - Add pricing and markup fields
*/

-- Add admin role type
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Manufacturer profiles
CREATE TABLE IF NOT EXISTS manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  company_name text NOT NULL,
  description text,
  website text,
  contact_email text NOT NULL,
  contact_phone text,
  subscription_tier text NOT NULL CHECK (subscription_tier IN ('basic', 'premium', 'enterprise')),
  subscription_status text NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'suspended', 'cancelled')),
  verified boolean DEFAULT false,
  rating numeric(3,2) CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Manufacturer physical locations
CREATE TABLE IF NOT EXISTS manufacturer_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  postal_code text NOT NULL,
  latitude numeric(10,8),
  longitude numeric(11,8),
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products offered by manufacturers
CREATE TABLE IF NOT EXISTS manufacturer_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  specifications jsonb NOT NULL DEFAULT '{}',
  materials jsonb NOT NULL DEFAULT '[]',
  lead_time_days integer,
  minimum_order integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Manufacturer pricing rules
CREATE TABLE IF NOT EXISTS manufacturer_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES manufacturer_products(id) ON DELETE CASCADE NOT NULL,
  component_type text NOT NULL,
  material text NOT NULL,
  base_price numeric(10,2) NOT NULL,
  volume_discounts jsonb DEFAULT '[]',
  conditions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(manufacturer_id, product_id, component_type, material)
);

-- Supplier settings and preferences
CREATE TABLE IF NOT EXISTS supplier_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  default_markup_percentage numeric(5,2) NOT NULL DEFAULT 30.00,
  use_default_pricing boolean DEFAULT true,
  pricing_visibility text NOT NULL DEFAULT 'hidden' CHECK (pricing_visibility IN ('hidden', 'range', 'exact')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Supplier-Manufacturer relationships
CREATE TABLE IF NOT EXISTS supplier_manufacturer_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES users(id) NOT NULL,
  manufacturer_id uuid REFERENCES manufacturers(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected', 'suspended')),
  markup_percentage numeric(5,2),
  custom_terms jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(supplier_id, manufacturer_id)
);

-- Default component pricing
CREATE TABLE IF NOT EXISTS pricing_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  component_type text NOT NULL,
  material text NOT NULL,
  base_price numeric(10,2) NOT NULL,
  unit text NOT NULL,
  conditions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(component_type, material)
);

-- Complex pricing rules
CREATE TABLE IF NOT EXISTS pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  conditions jsonb NOT NULL,
  adjustments jsonb NOT NULL,
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add manufacturer reference to existing tables
ALTER TABLE doors ADD COLUMN IF NOT EXISTS manufacturer_id uuid REFERENCES manufacturers(id);
ALTER TABLE doors ADD COLUMN IF NOT EXISTS manufacturing_status jsonb DEFAULT '{}';
ALTER TABLE doors ADD COLUMN IF NOT EXISTS supplier_markup_percentage numeric(5,2);

-- Enable Row Level Security
ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_manufacturer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Manufacturer policies
CREATE POLICY "Manufacturers can view own profile" ON manufacturers
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Manufacturers can update own profile" ON manufacturers
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Location policies
CREATE POLICY "Manufacturers can manage own locations" ON manufacturer_locations
  FOR ALL TO authenticated
  USING (manufacturer_id IN (
    SELECT id FROM manufacturers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Public can view city/state" ON manufacturer_locations
  FOR SELECT TO authenticated
  USING (true);

-- Product policies
CREATE POLICY "Manufacturers can manage own products" ON manufacturer_products
  FOR ALL TO authenticated
  USING (manufacturer_id IN (
    SELECT id FROM manufacturers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Public can view active products" ON manufacturer_products
  FOR SELECT TO authenticated
  USING (is_active = true);

-- Pricing policies
CREATE POLICY "Manufacturers can manage own pricing" ON manufacturer_pricing
  FOR ALL TO authenticated
  USING (manufacturer_id IN (
    SELECT id FROM manufacturers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Suppliers can view linked manufacturer pricing" ON manufacturer_pricing
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM supplier_manufacturer_links
      WHERE supplier_id = auth.uid()
      AND manufacturer_id = manufacturer_pricing.manufacturer_id
      AND status = 'active'
    )
  );

-- Supplier settings policies
CREATE POLICY "Suppliers can manage own settings" ON supplier_settings
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Supplier-Manufacturer link policies
CREATE POLICY "Users can manage own links" ON supplier_manufacturer_links
  FOR ALL TO authenticated
  USING (
    supplier_id = auth.uid() OR
    manufacturer_id IN (
      SELECT id FROM manufacturers WHERE user_id = auth.uid()
    )
  );

-- Component pricing policies
CREATE POLICY "Public can view pricing components" ON pricing_components
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage pricing components" ON pricing_components
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Pricing rules policies
CREATE POLICY "Public can view active rules" ON pricing_rules
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage pricing rules" ON pricing_rules
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Functions for price calculations
CREATE OR REPLACE FUNCTION calculate_door_price(
  door_specs jsonb,
  manufacturer_id uuid DEFAULT NULL,
  supplier_id uuid DEFAULT NULL
)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  base_price numeric := 0;
  final_price numeric := 0;
  markup_percentage numeric;
BEGIN
  -- Calculate base price using either manufacturer or default pricing
  IF manufacturer_id IS NOT NULL THEN
    -- Use manufacturer pricing
    SELECT COALESCE(SUM(base_price), 0)
    INTO base_price
    FROM manufacturer_pricing
    WHERE manufacturer_id = calculate_door_price.manufacturer_id
    AND component_type = door_specs->>'type'
    AND material = door_specs->>'material';
  ELSE
    -- Use default pricing
    SELECT COALESCE(SUM(base_price), 0)
    INTO base_price
    FROM pricing_components
    WHERE component_type = door_specs->>'type'
    AND material = door_specs->>'material';
  END IF;

  -- Apply pricing rules
  SELECT base_price * COALESCE(
    (
      SELECT SUM(CASE
        WHEN (rule->>'type')::text = 'multiplier' THEN (rule->>'value')::numeric
        WHEN (rule->>'type')::text = 'fixed' THEN 1 + (rule->>'value')::numeric / base_price
        ELSE 1
      END)
      FROM pricing_rules,
      jsonb_array_elements(adjustments) AS rule
      WHERE is_active = true
      AND door_specs @> conditions
    ),
    1
  )
  INTO final_price;

  -- Apply supplier markup if specified
  IF supplier_id IS NOT NULL THEN
    SELECT COALESCE(
      (
        SELECT markup_percentage
        FROM supplier_manufacturer_links
        WHERE supplier_id = calculate_door_price.supplier_id
        AND manufacturer_id = calculate_door_price.manufacturer_id
        AND status = 'active'
      ),
      (
        SELECT default_markup_percentage
        FROM supplier_settings
        WHERE user_id = supplier_id
      ),
      30.00
    )
    INTO markup_percentage;

    final_price := final_price * (1 + markup_percentage / 100);
  END IF;

  RETURN round(final_price, 2);
END;
$$;