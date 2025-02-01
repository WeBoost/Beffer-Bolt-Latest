-- Create user_role type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin', 'superadmin');
  END IF;
END $$;

-- Add superadmin value in a separate transaction
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

-- Create function to check if user is superadmin
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
END;
$$;

-- Create superadmin policies for all tables
DO $$
DECLARE
  table_record record;
BEGIN
  FOR table_record IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    -- Drop existing superadmin policy if exists
    EXECUTE format(
      'DROP POLICY IF EXISTS "Superadmins have full access to %I" ON %I',
      table_record.tablename,
      table_record.tablename
    );
    
    -- Create new superadmin policy
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

-- Update existing admin user to superadmin if exists
UPDATE users 
SET role = 'superadmin'::user_role 
WHERE email = 'admin@beffer.com';