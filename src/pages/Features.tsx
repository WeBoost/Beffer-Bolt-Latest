import React from 'react';
import { Layout, Box, ShoppingCart, Zap, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Layout className="text-blue-400" size={24} />,
    title: "Website Builder",
    description: "Create stunning websites with our drag-and-drop builder",
    benefits: [
      "Pre-built industry-specific templates",
      "Mobile-responsive designs",
      "SEO optimization tools",
      "Custom domain support"
    ]
  },
  {
    icon: <Box className="text-purple-400" size={24} />,
    title: "3D Door Configurator",
    description: "Let customers visualize and customize doors in real-time",
    benefits: [
      "Real-time 3D rendering",
      "Custom material options",
      "Accurate pricing calculation",
      "Save and share configurations"
    ]
  },
  {
    icon: <ShoppingCart className="text-emerald-400" size={24} />,
    title: "E-commerce Integration",
    description: "Sell doors online with powerful e-commerce features",
    benefits: [
      "Secure payment processing",
      "Inventory management",
      "Order tracking",
      "Shipping integration"
    ]
  }
];

const additionalFeatures = [
  {
    icon: <Zap className="text-yellow-400" size={24} />,
    title: "Performance Optimization",
    description: "Lightning-fast loading times and smooth interactions"
  },
  {
    icon: <Shield className="text-red-400" size={24} />,
    title: "Enterprise Security",
    description: "Bank-grade security to protect your business data"
  },
  {
    icon: <Users className="text-indigo-400" size={24} />,
    title: "Team Collaboration",
    description: "Work together seamlessly with role-based access"
  }
];

export function Features() {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for Door Manufacturers
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to showcase, sell, and manage your door manufacturing business online.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="w-12 h-12 bg-slate-900/50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{feature.title}</h2>
              <p className="text-slate-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle className="text-blue-500 shrink-0 mt-1" size={16} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Additional Features</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover more powerful tools and capabilities to enhance your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-900/50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of door manufacturers who are growing their business with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center text-lg font-medium group">
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 text-white rounded-lg hover:bg-slate-800 transition-colors border border-slate-700">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}