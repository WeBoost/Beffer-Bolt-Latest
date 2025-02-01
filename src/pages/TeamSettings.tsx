import React, { useState } from 'react';
import { useTeam } from '../contexts/TeamContext';
import { Users, UserPlus, Settings, Trash2, Shield, Mail } from 'lucide-react';

export function TeamSettings() {
  const {
    currentTeam,
    teamMembers,
    updateTeam,
    deleteTeam,
    inviteMember,
    updateMemberRole,
    removeMember
  } = useTeam();

  const [teamName, setTeamName] = useState(currentTeam?.name || '');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'manager' | 'admin'>('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!currentTeam) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-300">No team selected</p>
      </div>
    );
  }

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await updateTeam(currentTeam.id, teamName);
    } catch (err) {
      setError('Failed to update team');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await inviteMember(inviteEmail, inviteRole);
      setInviteEmail('');
    } catch (err) {
      setError('Failed to invite member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Team Details */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Settings size={20} />
              Team Settings
            </h2>
            <form onSubmit={handleUpdateTeam} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Team Members */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Users size={20} />
              Team Members
            </h2>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 font-medium">
                        {member.user.full_name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {member.user.full_name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {member.user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={member.role}
                      onChange={(e) => updateMemberRole(member.id, e.target.value as any)}
                      className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="member">Member</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Members */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} />
              Invite Members
            </h2>
            <form onSubmit={handleInviteMember} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="colleague@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Send Invitation
              </button>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20 h-fit">
          <h2 className="text-xl font-semibold text-red-500 mb-6">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                if (window.confirm('Are you sure? This action cannot be undone.')) {
                  deleteTeam(currentTeam.id);
                }
              }}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Team
            </button>
          </div>
          <p className="mt-4 text-sm text-red-400">
            Once you delete a team, there is no going back. Please be certain.
          </p>
        </div>
      </div>
    </div>
  );
}