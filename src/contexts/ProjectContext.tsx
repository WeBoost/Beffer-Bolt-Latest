import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTeam } from './TeamContext';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  name: string;
  customer: string;
  team_id: string;
  created_at: string;
}

interface Door {
  id: string;
  name: string;
  project_id: string;
  reference: string;
  what3words?: string;
  status: 'draft' | 'pending' | 'approved' | 'in_production' | 'installed';
  configuration: any;
  created_at: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  doors: Door[];
  loading: boolean;
  setCurrentProject: (project: Project | null) => void;
  createProject: (data: { name: string; customer: string }) => Promise<void>;
  updateProject: (id: string, data: { name?: string; customer?: string }) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createDoor: (data: { name: string; reference: string; what3words?: string; configuration: any }) => Promise<void>;
  updateDoor: (id: string, data: Partial<Door>) => Promise<void>;
  deleteDoor: (id: string) => Promise<void>;
  updateDoorStatus: (id: string, status: Door['status']) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { currentTeam } = useTeam();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch team's projects
  useEffect(() => {
    if (!currentTeam) return;

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('team_id', currentTeam.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data);
        if (data.length > 0 && !currentProject) {
          setCurrentProject(data[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentTeam]);

  // Fetch project doors when current project changes
  useEffect(() => {
    if (!currentProject) return;

    const fetchDoors = async () => {
      try {
        const { data, error } = await supabase
          .from('doors')
          .select('*')
          .eq('project_id', currentProject.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDoors(data);
      } catch (error) {
        console.error('Error fetching doors:', error);
      }
    };

    fetchDoors();
  }, [currentProject]);

  const createProject = async (data: { name: string; customer: string }) => {
    if (!currentTeam) throw new Error('No team selected');

    const { data: project, error } = await supabase
      .from('projects')
      .insert([{ ...data, team_id: currentTeam.id }])
      .select()
      .single();

    if (error) throw error;
    setProjects([project, ...projects]);
    setCurrentProject(project);
  };

  const updateProject = async (id: string, data: { name?: string; customer?: string }) => {
    const { error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id);

    if (error) throw error;
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...data } : project
    ));
    if (currentProject?.id === id) {
      setCurrentProject({ ...currentProject, ...data });
    }
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setProjects(projects.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(projects[0] || null);
    }
  };

  const createDoor = async (data: { name: string; reference: string; what3words?: string; configuration: any }) => {
    if (!currentProject) throw new Error('No project selected');

    const { data: door, error } = await supabase
      .from('doors')
      .insert([{
        ...data,
        project_id: currentProject.id,
        status: 'draft'
      }])
      .select()
      .single();

    if (error) throw error;
    setDoors([door, ...doors]);
  };

  const updateDoor = async (id: string, data: Partial<Door>) => {
    const { error } = await supabase
      .from('doors')
      .update(data)
      .eq('id', id);

    if (error) throw error;
    setDoors(doors.map(door => 
      door.id === id ? { ...door, ...data } : door
    ));
  };

  const deleteDoor = async (id: string) => {
    const { error } = await supabase
      .from('doors')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setDoors(doors.filter(door => door.id !== id));
  };

  const updateDoorStatus = async (id: string, status: Door['status']) => {
    const { error } = await supabase
      .from('doors')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    setDoors(doors.map(door => 
      door.id === id ? { ...door, status } : door
    ));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      doors,
      loading,
      setCurrentProject,
      createProject,
      updateProject,
      deleteProject,
      createDoor,
      updateDoor,
      deleteDoor,
      updateDoorStatus
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}