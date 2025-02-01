import React from 'react';
import { Calendar, Download, BarChart2, TrendingUp, DollarSign, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide- rcise';

interface AnalyticsStat {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface TopProduct {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  growth: number;
}

interface TopSupplier {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  growth: number;
}

export function ManufacturerAnalytics() {
  const [dateRange, setDateRange] = React.useState('30d');
  const [loading, setLoading] = React.useState(true);

  const stats: AnalyticsStat[] = [
    {
      label: 'Total Revenue',
      value: '$128,450',
      change: 12.5,
      trend: 'up',
      icon: <DollarSign className="text-blue-500" size={24} />
    },
    {
      label: 'Total Orders',
      value: '1,284',
      change: 8.2,
      trend: 'up',
      icon: <Package className="text-purple-500" size={24} />
    },
    {
      label: 'Active Suppliers',
      value: '48',
      change: -2.4,
      trend: 'down',
      icon: <Users className="text-emerald-500" size={24} />
    },
    {
      label: 'Average Order Value',
      value: '$842',
      change: 5.7,
      trend: 'up',
      icon: <TrendingUp className="text-yellow-500" size={24} />
    }
  ];

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Premium Security Door',
      orders: 245,
      revenue: 98450,
      growth: 15.8
    },
    {
      id: '2',
      name: 'Fire Rated Steel Door',
      orders: 186,
      revenue: 74200,
      growth: 12.3
    },
    {
      id: '3',
      name: 'Acoustic Interior Door',
      orders: 142,
      revenue: 56800,
      growth: -4.2
    }
  ];

  const topSuppliers: TopSupplier[] = [
    {
      id: '1',
      name: 'Elite Doors Ltd',
      orders: 156,
      revenue: 62400,
      growth: 18.5
    },
    {
      id: '2',
      name: 'Premium Installations',
      orders: 124,
      revenue: 49600,
      growth: 8.7
    },
    {
      id: '3',
      name: 'Secure Solutions Co',
      orders: 98,
      revenue: 39200,
      growth: -2.1
    }
  ];

  React.useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-300">Track your performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900/50 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="text-green-500" size={16} />
                  ) : (
                    <ArrowDownRight className="text-red-500" size={16} />
                  )}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart2 size={20} />
            Revenue Trend
          </h2>
          <div className="aspect-[4/3] bg-slate-900/50 rounded-lg flex items-center justify-center">
            <span className="text-slate-400">Revenue chart will be rendered here</span>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar size={20} />
            Orders Timeline
          </h2>
          <div className="aspect-[4/3] bg-slate-900/50 rounded-lg flex items-center justify-center">
            <span className="text-slate-400">Orders chart will be rendered here</span>
          </div>
        </div>
      </div>

      {/* Top Products & Suppliers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white mb-1">{product.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{product.orders} orders</span>
                      <span>${product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.growth >= 0 ? (
                      <ArrowUpRight className="text-green-500" size={16} />
                    ) : (
                      <ArrowDownRight className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm ${
                      product.growth >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Suppliers</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {topSuppliers.map((supplier) => (
                <div key={supplier.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white mb-1">{supplier.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{supplier.orders} orders</span>
                      <span>${supplier.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {supplier.growth >= 0 ? (
                      <ArrowUpRight className="text-green-500" size={16} />
                    ) : (
                      <ArrowDownRight className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm ${
                      supplier.growth >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(supplier.growth)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}