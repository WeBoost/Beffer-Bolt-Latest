import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Layout, Palette, Shuffle, Plus, Store, Building2, Briefcase, ShoppingBag, Factory, Warehouse, PenTool as Tools, HardHat, Home, Building, Boxes, Users } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  features: string[];
  industry: string;
  price: string;
}

const templates: Template[] = [
  {
    id: 'modern-showroom',
    name: 'Modern Showroom',
    description: 'A sleek, modern template perfect for showcasing your door collection with 3D previews.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
    category: 'Showroom',
    rating: 5,
    features: ['3D Configurator', 'Product Gallery', 'Quote Request System', 'Virtual Showroom'],
    industry: 'Luxury Doors',
    price: 'Premium'
  },
  {
    id: 'premium-store',
    name: 'Premium Store',
    description: 'Built for high-end door manufacturers with advanced e-commerce capabilities.',
    image: 'https://images.unsplash.com/photo-1617392847656-10a3744239dd?q=80&w=2670&auto=format&fit=crop',
    category: 'E-commerce',
    rating: 5,
    features: ['Online Store', 'Payment Processing', 'Inventory Management', 'Order Tracking'],
    industry: 'Direct to Consumer',
    price: 'Premium'
  },
  {
    id: 'contractor-pro',
    name: 'Contractor Pro',
    description: 'Designed for contractors and installers with project management tools.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop',
    category: 'Professional',
    rating: 4,
    features: ['Project Dashboard', 'Installation Guides', 'Team Management', 'Client Portal'],
    industry: 'Contractors',
    price: 'Professional'
  },
  {
    id: 'industrial-wholesale',
    name: 'Industrial Wholesale',
    description: 'Optimized for B2B sales with bulk ordering and trade pricing.',
    image: 'https://images.unsplash.com/photo-1565626424178-c699f6601afd?q=80&w=2670&auto=format&fit=crop',
    category: 'B2B',
    rating: 5,
    features: ['Bulk Orders', 'Trade Pricing', 'Account Management', 'Quick Reorder'],
    industry: 'Wholesale',
    price: 'Enterprise'
  },
  {
    id: 'manufacturer-direct',
    name: 'Manufacturer Direct',
    description: 'Perfect for door manufacturers selling directly to customers and trade.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2670&auto=format&fit=crop',
    category: 'Hybrid',
    rating: 4,
    features: ['Dual B2B/B2C', 'Production Tracking', 'Custom Orders', 'Trade Portal'],
    industry: 'Manufacturing',
    price: 'Professional'
  },
  {
    id: 'architect-spec',
    name: 'Architect Spec',
    description: 'Specialized template for architectural door specifications and projects.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2670&auto=format&fit=crop',
    category: 'Professional',
    rating: 5,
    features: ['CAD Downloads', 'Spec Sheets', 'Project Collaboration', 'BIM Integration'],
    industry: 'Architectural',
    price: 'Enterprise'
  },
  {
    id: 'security-pro',
    name: 'Security Pro',
    description: 'Focused on high-security doors and access control systems.',
    image: 'https://images.unsplash.com/photo-1578495547142-8f659cb9fdca?q=80&w=2670&auto=format&fit=crop',
    category: 'Specialized',
    rating: 4,
    features: ['Security Specs', 'Compliance Info', 'Access Control', 'Installation'],
    industry: 'Security',
    price: 'Professional'
  },
  {
    id: 'interior-design',
    name: 'Interior Design',
    description: 'Showcase interior doors with design-focused layouts.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop',
    category: 'Design',
    rating: 5,
    features: ['Style Gallery', 'Design Tools', 'Inspiration Board', 'Material Library'],
    industry: 'Interior Design',
    price: 'Premium'
  },
  {
    id: 'quick-ship',
    name: 'Quick Ship',
    description: 'Streamlined template for fast-moving inventory and quick delivery.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop',
    category: 'E-commerce',
    rating: 4,
    features: ['Stock Status', 'Fast Checkout', 'Delivery Tracking', 'Returns Portal'],
    industry: 'Quick Service',
    price: 'Professional'
  },
  {
    id: 'custom-build',
    name: 'Custom Build',
    description: 'For manufacturers specializing in custom door creation.',
    image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2670&auto=format&fit=crop',
    category: 'Custom',
    rating: 5,
    features: ['Custom Builder', 'Quote System', 'Project Tracking', 'Approvals'],
    industry: 'Custom Manufacturing',
    price: 'Enterprise'
  },
  {
    id: 'trade-pro',
    name: 'Trade Pro',
    description: 'Built for trade professionals with specialized features.',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2670&auto=format&fit=crop',
    category: 'Trade',
    rating: 4,
    features: ['Trade Portal', 'Bulk Pricing', 'Account Management', 'Quick Order'],
    industry: 'Trade',
    price: 'Professional'
  },
  {
    id: 'garage-specialist',
    name: 'Garage Specialist',
    description: 'Specialized template for garage and industrial door sales.',
    image: 'https://images.unsplash.com/photo-1621371205896-3082fa811d54?q=80&w=2670&auto=format&fit=crop',
    category: 'Specialized',
    rating: 4,
    features: ['Size Calculator', 'Installation Booking', 'Service Plans', 'Maintenance'],
    industry: 'Garage Doors',
    price: 'Professional'
  }
];

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: 'all', name: 'All Templates', icon: <Layout size={20} /> },
  { id: 'showroom', name: 'Showroom', icon: <Store size={20} /> },
  { id: 'e-commerce', name: 'E-commerce', icon: <ShoppingBag size={20} /> },
  { id: 'b2b', name: 'B2B / Wholesale', icon: <Factory size={20} /> },
  { id: 'professional', name: 'Professional', icon: <Briefcase size={20} /> },
  { id: 'specialized', name: 'Specialized', icon: <Tools size={20} /> },
  { id: 'custom', name: 'Custom', icon: <Plus size={20} /> }
];

export function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || 
      template.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Select from our professionally designed templates or create your own custom design.
            All templates include our powerful door configurator and e-commerce features.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                if (category.id === 'custom') {
                  setShowCustomBuilder(true);
                } else {
                  setSelectedCategory(category.id);
                  setShowCustomBuilder(false);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {showCustomBuilder ? (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Custom Template Builder
              </h2>
              <p className="text-slate-300">
                Create your perfect template by selecting layouts for each page section.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Page Types */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Core Pages</h3>
                <div className="space-y-4">
                  {['Home', 'Products', 'Configurator', 'About', 'Contact'].map((page) => (
                    <div
                      key={page}
                      className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 flex items-center justify-between"
                    >
                      <span className="text-slate-300">{page}</span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                          Choose Layout
                        </button>
                        <button className="p-1 text-slate-400 hover:text-white transition-colors">
                          <Shuffle size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Preview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                <div className="bg-slate-900/50 rounded-lg border border-slate-600 aspect-video flex items-center justify-center">
                  <span className="text-slate-400">Select a page to preview</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/launch?template=custom"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Start Building
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-slate-900/90 rounded-full text-xs font-medium text-slate-300">
                        {template.industry}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/90 rounded-full text-xs font-medium text-white">
                        {template.price}
                      </span>
                      <div className="flex gap-1">
                        {Array(template.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="fill-yellow-500 text-yellow-500"
                            />
                          ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {template.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <CheckCircle size={16} className="text-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/launch?template=${template.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
                  >
                    Use This Template
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}