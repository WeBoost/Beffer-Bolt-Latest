import React from 'react';
import { Search, Book, MessageCircle, FileText, ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of setting up your door manufacturing website',
    icon: Book,
    articles: [
      'Quick start guide',
      'Setting up your first template',
      'Configuring your domain',
      'Understanding the dashboard'
    ]
  },
  {
    title: '3D Configurator',
    description: 'Master the door configuration tools',
    icon: FileText,
    articles: [
      'Using the 3D editor',
      'Adding custom materials',
      'Setting up pricing rules',
      'Exporting configurations'
    ]
  },
  {
    title: 'Orders & Payments',
    description: 'Manage your orders and payment processing',
    icon: MessageCircle,
    articles: [
      'Processing orders',
      'Payment methods',
      'Refund policy',
      'Shipping setup'
    ]
  }
];

export function Help() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">How can we help?</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Search our knowledge base or browse categories below
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-blue-500" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {category.title}
              </h2>
              <p className="text-slate-300 mb-6">{category.description}</p>
              <ul className="space-y-3 mb-6">
                {category.articles.map((article) => (
                  <li key={article}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                View all articles →
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Still need help?
        </h2>
        <p className="text-slate-300 mb-8">
          Our support team is available 24/7 to assist you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
          <button className="px-6 py-3 bg-slate-800/50 text-white rounded-lg hover:bg-slate-800 transition-colors border border-slate-700">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
}