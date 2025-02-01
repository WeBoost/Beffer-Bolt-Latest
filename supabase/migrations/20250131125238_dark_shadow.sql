-- Add superadmin to user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'superadmin';

-- Update existing admin user to superadmin
UPDATE users 
SET role = 'superadmin'::user_role 
WHERE email = 'admin@beffer.com';

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