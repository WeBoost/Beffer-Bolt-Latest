import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface Team {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  role: 'admin' | 'manager' | 'member';
  user: {
    full_name: string;
    email: string;
  };
}

interface TeamContextType {
  teams: Team[];
  currentTeam: Team | null;
  teamMembers: TeamMember[];
  loading: boolean;
  setCurrentTeam: (team: Team | null) => void;
  createTeam: (name: string) => Promise<void>;
  updateTeam: (id: string, name: string) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
  inviteMember: (email: string, role: TeamMember['role']) => Promise<void>;
  updateMemberRole: (memberId: string, role: TeamMember['role']) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's teams
  useEffect(() => {
    if (!user) return;

    const fetchTeams = async () => {
      try {
        const { data: memberTeams, error: memberError } = await supabase
          .from('team_members')
          .select('team:teams(*)')
          .eq('user_id', user.id);

        if (memberError) throw memberError;

        const { data: ownedTeams, error: ownerError } = await supabase
          .from('teams')
          .select('*')
          .eq('owner_id', user.id);

        if (ownerError) throw ownerError;

        const allTeams = [
          ...ownedTeams,
          ...memberTeams.map(mt => mt.team)
        ].filter((team, index, self) => 
          index === self.findIndex(t => t.id === team.id)
        );

        setTeams(allTeams);
        if (allTeams.length > 0 && !currentTeam) {
          setCurrentTeam(allTeams[0]);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [user]);

  // Fetch team members when current team changes
  useEffect(() => {
    if (!currentTeam) return;

    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select(`
            id,
            user_id,
            team_id,
            role,
            user:users(full_name, email)
          `)
          .eq('team_id', currentTeam.id);

        if (error) throw error;
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchMembers();
  }, [currentTeam]);

  const createTeam = async (name: string) => {
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('teams')
      .insert([{ name, owner_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    setTeams([...teams, data]);
    setCurrentTeam(data);
  };

  const updateTeam = async (id: string, name: string) => {
    const { error } = await supabase
      .from('teams')
      .update({ name })
      .eq('id', id);

    if (error) throw error;
    setTeams(teams.map(team => team.id === id ? { ...team, name } : team));
    if (currentTeam?.id === id) {
      setCurrentTeam({ ...currentTeam, name });
    }
  };

  const deleteTeam = async (id: string) => {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setTeams(teams.filter(team => team.id !== id));
    if (currentTeam?.id === id) {
      setCurrentTeam(teams[0] || null);
    }
  };

  const inviteMember = async (email: string, role: TeamMember['role']) => {
    if (!currentTeam) throw new Error('No team selected');

    // First, check if user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError) throw new Error('User not found');

    // Then add them to the team
    const { error } = await supabase
      .from('team_members')
      .insert([{
        team_id: currentTeam.id,
        user_id: userData.id,
        role
      }]);

    if (error) throw error;
  };

  const updateMemberRole = async (memberId: string, role: TeamMember['role']) => {
    const { error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', memberId);

    if (error) throw error;
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId ? { ...member, role } : member
      )
    );
  };

  const removeMember = async (memberId: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;
    setTeamMembers(members => members.filter(member => member.id !== memberId));
  };

  return (
    <TeamContext.Provider value={{
      teams,
      currentTeam,
      teamMembers,
      loading,
      setCurrentTeam,
      createTeam,
      updateTeam,
      deleteTeam,
      inviteMember,
      updateMemberRole,
      removeMember
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}