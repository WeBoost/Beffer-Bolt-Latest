import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useTeam } from '../contexts/TeamContext';
import { Plus, FolderOpen, Building2, Search, Filter, ArrowRight, Package, Clock, CheckCircle } from 'lucide-react';

export function ProjectDashboard() {
  const { currentTeam } = useTeam();
  const {
    projects,
    currentProject,
    doors,
    setCurrentProject,
    createProject,
    createDoor,
    updateDoorStatus
  } = useProject();

  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewDoor, setShowNewDoor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newProject, setNewProject] = useState({ name: '', customer: '' });
  const [newDoor, setNewDoor] = useState({
    name: '',
    reference: '',
    what3words: '',
    configuration: {}
  });

  if (!currentTeam) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">No Team Selected</h2>
          <p className="text-slate-300">Please select or create a team to manage projects.</p>
        </div>
      </div>
    );
  }

  const filteredDoors = doors.filter(door => {
    const matchesSearch = door.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || door.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setNewProject({ name: '', customer: '' });
      setShowNewProject(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleCreateDoor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDoor(newDoor);
      setNewDoor({ name: '', reference: '', what3words: '', configuration: {} });
      setShowNewDoor(false);
    } catch (error) {
      console.error('Error creating door:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in_production': return 'bg-blue-100 text-blue-800';
      case 'installed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-300">Manage your door projects and configurations</p>
        </div>
        <button
          onClick={() => setShowNewProject(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => setCurrentProject(project)}
            className={`p-6 rounded-xl border transition-colors text-left ${
              currentProject?.id === project.id
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen size={24} />
              <div className="flex-1">
                <h3 className="font-semibold">{project.name}</h3>
                <p className={`text-sm ${
                  currentProject?.id === project.id ? 'text-blue-200' : 'text-slate-400'
                }`}>
                  {project.customer}
                </p>
              </div>
              <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1 ${
                currentProject?.id === project.id ? 'text-blue-200' : 'text-slate-400'
              }`}>
                <Package size={16} />
                {doors.filter(d => d.project_id === project.id).length} doors
              </div>
              <div className={`flex items-center gap-1 ${
                currentProject?.id === project.id ? 'text-blue-200' : 'text-slate-400'
              }`}>
                <Clock size={16} />
                {new Date(project.created_at).toLocaleDateString()}
              </div>
            </div>
          </button>
        ))}
      </div>

      {currentProject && (
        <>
          {/* Doors Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentProject.name} - Doors
              </h2>
              <p className="text-slate-300">
                Customer: {currentProject.customer}
              </p>
            </div>
            <button
              onClick={() => setShowNewDoor(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Door
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search doors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in_production">In Production</option>
              <option value="installed">Installed</option>
            </select>
          </div>

          {/* Doors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoors.map(door => (
              <div
                key={door.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">{door.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(door.status)}`}>
                      {door.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-300">
                      Reference: {door.reference}
                    </p>
                    {door.what3words && (
                      <p className="text-sm text-slate-300">
                        Location: {door.what3words}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateDoorStatus(door.id, 'approved')}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Customer
                </label>
                <input
                  type="text"
                  value={newProject.customer}
                  onChange={(e) => setNewProject({ ...newProject, customer: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Door Modal */}
      {showNewDoor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6">Add New Door</h2>
            <form onSubmit={handleCreateDoor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Door Name
                </label>
                <input
                  type="text"
                  value={newDoor.name}
                  onChange={(e) => setNewDoor({ ...newDoor, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={newDoor.reference}
                  onChange={(e) => setNewDoor({ ...newDoor, reference: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  what3words Location
                </label>
                <input
                  type="text"
                  value={newDoor.what3words}
                  onChange={(e) => setNewDoor({ ...newDoor, what3words: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. filled.count.soap"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewDoor(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Door
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}