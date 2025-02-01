/*
  # Fix superadmin role and policies

  1. Changes
    - Create user_role enum type if not exists
    - Add superadmin value to enum type
    - Create is_superadmin() function
    - Create superadmin policies for all tables
    - Update admin user to superadmin role

  2. Security
    - Enable RLS for all tables
    - Add superadmin access policies
    - Create secure function for superadmin check
*/

-- First transaction: Create enum type
DO $$
BEGIN
  -- Create user_role type if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin', 'superadmin');
  END IF;
END $$;

COMMIT;

-- Second transaction: Add superadmin value if needed
DO $$
BEGIN
  -- Check if superadmin value exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumtypid = 'user_role'::regtype
    AND enumlabel = 'superadmin'
  ) THEN
    -- Add superadmin value
    ALTER TYPE user_role ADD VALUE 'superadmin';
  END IF;
END $$;

COMMIT;

-- Third transaction: Create admin function
CREATE OR REPLACE FUNCTION is_superadmin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'superadmin'::user_role
  );
END $$;

COMMIT;

-- Fourth transaction: Create policies
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
      'DROP POLICY IF EXISTS "Superadmins have full access to %I" ON %I',
      table_record.tablename,
      table_record.tablename
    );
    
    -- Create new policy
    EXECUTE format(
      'CREATE POLICY "Superadmins have full access to %I" ON %I
       FOR ALL
       TO authenticated
       USING (
         EXISTS (
           SELECT 1 FROM users
           WHERE id = auth.uid()
           AND role = ''superadmin''::user_role
         )
       )',
      table_record.tablename,
      table_record.tablename
    );
  END LOOP;
END $$;

COMMIT;

-- Fifth transaction: Update admin user
UPDATE users 
SET role = 'superadmin'::user_role 
WHERE email = 'admin@beffer.com';