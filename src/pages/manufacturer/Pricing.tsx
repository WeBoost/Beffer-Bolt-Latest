import React from 'react';
import { Plus, Search, Filter, DollarSign, Package, Edit, Trash2, Upload, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PricingRule {
  id: string;
  product_id: string;
  component_type: string;
  material: string;
  base_price: number;
  volume_discounts: {
    quantity: number;
    discount_percentage: number;
  }[];
  conditions: any;
  created_at: string;
}

export function ManufacturerPricing() {
  const [pricingRules, setPricingRules] = React.useState<PricingRule[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [componentFilter, setComponentFilter] = React.useState('all');
  const [showBulkUpload, setShowBulkUpload] = React.useState(false);

  React.useEffect(() => {
    const fetchPricingRules = async () => {
      try {
        const { data: manufacturer } = await supabase
          .from('manufacturers')
          .select('id')
          .single();

        if (!manufacturer) return;

        const { data, error } = await supabase
          .from('manufacturer_pricing')
          .select('*')
          .eq('manufacturer_id', manufacturer.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPricingRules(data || []);
      } catch (error) {
        console.error('Error fetching pricing rules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingRules();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Here you would process the CSV/Excel file
      // For now, we'll just show a success message
      alert('File uploaded successfully! Processing...');
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleExportPricing = () => {
    // Here you would generate and download the pricing CSV
    alert('Exporting pricing data...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading pricing rules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pricing Management</h1>
          <p className="text-slate-300">Manage your product pricing and rules</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Upload size={20} />
            Bulk Upload
          </button>
          <button
            onClick={handleExportPricing}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Download size={20} />
            Export
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Rule
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search pricing rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={componentFilter}
          onChange={(e) => setComponentFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Components</option>
          <option value="frame">Frame</option>
          <option value="panel">Panel</option>
          <option value="hardware">Hardware</option>
          <option value="glass">Glass</option>
        </select>
      </div>

      {/* Pricing Rules Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Component</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Material</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Base Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Volume Discounts</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Last Updated</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {pricingRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Package className="text-slate-400" size={20} />
                      <span className="text-white capitalize">{rule.component_type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white capitalize">{rule.material}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-white">
                      <DollarSign size={16} />
                      {rule.base_price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {rule.volume_discounts.map((discount, index) => (
                      <div key={index} className="text-sm text-slate-300">
                        {discount.quantity}+ units: {discount.discount_percentage}% off
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(rule.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit size={20} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6">Bulk Upload Pricing</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="text-slate-400" size={32} />
                  <span className="text-slate-300">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-sm text-slate-400">
                    CSV or Excel files only
                  </span>
                </label>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}