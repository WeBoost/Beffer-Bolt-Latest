/*
  # Add Teams and Projects Schema

  1. New Tables
    - teams (Team management)
    - team_members (Team member roles)
    - projects (Project organization)
    - doors (Door configurations)

  2. Security
    - Enable RLS on all new tables
    - Add policies for team-based access control
    - Add policies for project and door management

  3. Changes
    - Adds team and project management capabilities
    - Implements role-based access control
    - Supports door tracking with references
*/

-- Teams table for managing team access
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table for managing team roles
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'member')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Projects table for organizing doors
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  customer text NOT NULL,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Doors table for storing door configurations
CREATE TABLE IF NOT EXISTS doors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  reference text NOT NULL,
  what3words text,
  status text NOT NULL CHECK (status IN ('draft', 'pending', 'approved', 'in_production', 'installed')),
  configuration jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE doors ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Users can view own teams" ON teams
  FOR SELECT TO authenticated
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create teams" ON teams
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Team owners can update teams" ON teams
  FOR UPDATE TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Team owners can delete teams" ON teams
  FOR DELETE TO authenticated
  USING (owner_id = auth.uid());

-- Team members policies
CREATE POLICY "Users can view team members" ON team_members
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_members.team_id
      AND (
        teams.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM team_members tm
          WHERE tm.team_id = teams.id
          AND tm.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Team admins can manage members" ON team_members
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_members.team_id
      AND (
        teams.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM team_members tm
          WHERE tm.team_id = teams.id
          AND tm.user_id = auth.uid()
          AND tm.role = 'admin'
        )
      )
    )
  );

-- Projects policies
CREATE POLICY "Team members can view projects" ON projects
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can create projects" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can update projects" ON projects
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can delete projects" ON projects
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Doors policies
CREATE POLICY "Team members can view doors" ON doors
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN team_members ON team_members.team_id = projects.team_id
      WHERE projects.id = doors.project_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can create doors" ON doors
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      JOIN team_members ON team_members.team_id = projects.team_id
      WHERE projects.id = doors.project_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can update doors" ON doors
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN team_members ON team_members.team_id = projects.team_id
      WHERE projects.id = doors.project_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can delete doors" ON doors
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN team_members ON team_members.team_id = projects.team_id
      WHERE projects.id = doors.project_id
      AND team_members.user_id = auth.uid()
    )
  );