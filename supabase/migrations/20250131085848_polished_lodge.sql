/*
  # Initial Schema for Beffer Site Launcher

  1. New Tables
    - `users`
      - Stores user account information
      - Links to auth.users for authentication
    - `sites`
      - Stores information about created websites
      - Tracks configuration, status, and deployment details
    - `subscriptions`
      - Manages subscription plans and billing
    - `door_configurations`
      - Stores door configurator presets and options
    - `orders`
      - Tracks e-commerce orders and status

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure data isolation between different sites
*/

-- Users table to extend auth.users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sites table for website instances
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  domain text UNIQUE,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  template text NOT NULL,
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  site_id uuid REFERENCES sites(id) NOT NULL,
  plan text NOT NULL CHECK (plan IN ('basic', 'premium', 'enterprise')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'suspended')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Door configurations table
CREATE TABLE IF NOT EXISTS door_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) NOT NULL,
  name text NOT NULL,
  style text NOT NULL,
  materials jsonb NOT NULL,
  dimensions jsonb NOT NULL,
  accessories jsonb DEFAULT '[]',
  price numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  items jsonb NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE door_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read and update their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Sites policies
CREATE POLICY "Users can view own sites" ON sites
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create sites" ON sites
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sites" ON sites
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Door configurations policies
CREATE POLICY "Users can view site door configs" ON door_configurations
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sites WHERE sites.id = door_configurations.site_id AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage site door configs" ON door_configurations
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sites WHERE sites.id = door_configurations.site_id AND sites.user_id = auth.uid()
  ));

-- Orders policies
CREATE POLICY "Users can view site orders" ON orders
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sites WHERE sites.id = orders.site_id AND sites.user_id = auth.uid()
  ));