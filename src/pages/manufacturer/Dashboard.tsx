import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, Settings, BarChart2, Plus, DollarSign, Truck, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ManufacturerStats {
  totalProducts: number;
  activeSuppliers: number;
  monthlyRevenue: number;
  pendingOrders: number;
}

interface RecentOrder {
  id: string;
  reference: string;
  customer: string;
  status: string;
  amount: number;
  created_at: string;
}

export function ManufacturerDashboard() {
  const [stats, setStats] = React.useState<ManufacturerStats>({
    totalProducts: 0,
    activeSuppliers: 0,
    monthlyRevenue: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = React.useState<RecentOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch manufacturer profile and stats
        const { data: manufacturer } = await supabase
          .from('manufacturers')
          .select('*')
          .single();

        if (!manufacturer) {
          navigate('/manufacturer/onboarding');
          return;
        }

        // Fetch stats
        const { data: products } = await supabase
          .from('manufacturer_products')
          .select('id')
          .eq('manufacturer_id', manufacturer.id);

        const { data: suppliers } = await supabase
          .from('supplier_manufacturer_links')
          .select('id')
          .eq('manufacturer_id', manufacturer.id)
          .eq('status', 'active');

        // Fetch recent orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .eq('manufacturer_id', manufacturer.id)
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalProducts: products?.length || 0,
          activeSuppliers: suppliers?.length || 0,
          monthlyRevenue: 50000, // Example value - would be calculated from actual orders
          pendingOrders: 12 // Example value
        });

        setRecentOrders(orders || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Products</p>
              <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Users className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Suppliers</p>
              <p className="text-2xl font-bold text-white">{stats.activeSuppliers}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">
                ${stats.monthlyRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Pending Orders</p>
              <p className="text-2xl font-bold text-white">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <button
          onClick={() => navigate('/manufacturer/products/new')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Plus className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Add New Product</h3>
              <p className="text-sm text-slate-400">Create a new door product</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/manufacturer/pricing')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Settings className="text-green-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Pricing</h3>
              <p className="text-sm text-slate-400">Update your pricing rules</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/manufacturer/analytics')}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <BarChart2 className="text-purple-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">View Analytics</h3>
              <p className="text-sm text-slate-400">See detailed reports</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Reference</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/50">
                  <td className="px-6 py-4 text-white">{order.reference}</td>
                  <td className="px-6 py-4 text-white">{order.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}