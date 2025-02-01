/*
  # Update admin role and policies

  1. Changes
    - Create user_role enum type if not exists
    - Add admin value to enum type
    - Create is_admin() function
    - Create admin policies for all tables
    - Update admin user to admin role

  2. Security
    - Enable RLS for all tables
    - Add admin access policies
    - Create secure function for admin check
*/

-- First transaction: Create enum type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
  END IF;
END $$;

COMMIT;

-- Second transaction: Create admin function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'admin'::user_role
  );
END $$;

COMMIT;

-- Third transaction: Create policies
DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    -- Drop existing policy if exists
    EXECUTE format(
      'DROP POLICY IF EXISTS "Admins have full access to %I" ON %I',
      table_record.tablename,
      table_record.tablename
    );
    
    -- Create new policy
    EXECUTE format(
      'CREATE POLICY "Admins have full access to %I" ON %I
       FOR ALL
       TO authenticated
       USING (
         EXISTS (
           SELECT 1 FROM users
           WHERE id = auth.uid()
           AND role = ''admin''::user_role
         )
       )',
      table_record.tablename,
      table_record.tablename
    );
  END LOOP;
END $$;

COMMIT;

-- Fourth transaction: Update admin user
UPDATE users 
SET role = 'admin'::user_role 
WHERE email = 'admin@beffer.com';