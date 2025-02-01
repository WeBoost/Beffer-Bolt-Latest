import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, Package, Settings, BarChart2, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalSites: 0,
    totalOrders: 0,
    activeSubscriptions: 0
  });
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: userCount },
          { count: siteCount },
          { count: orderCount },
          { count: subscriptionCount }
        ] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact' }),
          supabase.from('sites').select('*', { count: 'exact' }),
          supabase.from('orders').select('*', { count: 'exact' }),
          supabase.from('subscriptions').select('*', { count: 'exact' })
        ]);

        setStats({
          totalUsers: userCount || 0,
          totalSites: siteCount || 0,
          totalOrders: orderCount || 0,
          activeSubscriptions: subscriptionCount || 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-300">System overview and management</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/settings')}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Settings size={20} />
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Sites</p>
              <p className="text-2xl font-bold text-white">{stats.totalSites}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Package className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Orders</p>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Shield className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Subscriptions</p>
              <p className="text-2xl font-bold text-white">{stats.activeSubscriptions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <button
          onClick={() => navigate('/admin/users')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Users</h3>
              <p className="text-sm text-slate-400">View and manage user accounts</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/sites')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="text-green-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Sites</h3>
              <p className="text-sm text-slate-400">Monitor and manage websites</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/analytics')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <BarChart2 className="text-purple-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">System Analytics</h3>
              <p className="text-sm text-slate-400">View detailed analytics</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}