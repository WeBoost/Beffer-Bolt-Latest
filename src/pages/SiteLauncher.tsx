import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout, Palette, Globe, CheckCircle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'modern-showroom',
    name: 'Modern Showroom',
    description: 'A sleek, modern template perfect for showcasing your door collection.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
    features: ['3D Configurator', 'Product Gallery', 'Quote System', 'Virtual Showroom']
  },
  {
    id: 'premium-store',
    name: 'Premium Store',
    description: 'Built for high-end door manufacturers with advanced e-commerce capabilities.',
    image: 'https://images.unsplash.com/photo-1617392847656-10a3744239dd?q=80&w=2670&auto=format&fit=crop',
    features: ['Online Store', 'Payment Processing', 'Inventory Management', 'Order Tracking']
  },
  {
    id: 'contractor-pro',
    name: 'Contractor Pro',
    description: 'Designed for contractors and installers with project management tools.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop',
    features: ['Project Dashboard', 'Installation Guides', 'Team Management', 'Client Portal']
  }
];

interface FormData {
  template: string;
  siteName: string;
  companyName: string;
  primaryColor: string;
  accentColor: string;
  domain: string;
}

const initialFormData: FormData = {
  template: '',
  siteName: '',
  companyName: '',
  primaryColor: '#3B82F6',
  accentColor: '#10B981',
  domain: ''
};

export function SiteLauncher() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Create the site in the database
      const { data: site, error: siteError } = await supabase
        .from('sites')
        .insert([
          {
            user_id: user.id,
            name: formData.siteName,
            domain: formData.domain,
            template: formData.template,
            config: {
              company_name: formData.companyName,
              primary_color: formData.primaryColor,
              accent_color: formData.accentColor
            }
          }
        ])
        .select()
        .single();

      if (siteError) throw siteError;

      // Navigate to the dashboard
      navigate('/dashboard', { 
        state: { 
          message: 'Site created successfully! We\'ll notify you once it\'s ready.',
          siteId: site.id
        }
      });
    } catch (error) {
      console.error('Error creating site:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in</h1>
          <p className="text-slate-300 mb-6">
            You need to be signed in to launch a new site.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3, 4].map((number) => (
            <div
              key={number}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= number
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {step > number ? (
                <CheckCircle size={16} />
              ) : (
                <span className="text-sm">{number}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">
                  Choose a Template
                </h1>
                <p className="text-xl text-slate-300">
                  Select a template that best fits your business needs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`bg-slate-800/50 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer hover:border-blue-500 ${
                      formData.template === template.id
                        ? 'border-blue-500'
                        : 'border-slate-700'
                    }`}
                    onClick={() => setFormData({ ...formData, template: template.id })}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      {formData.template === template.id && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <CheckCircle className="text-white" size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {template.name}
                      </h3>
                      <p className="text-slate-300 mb-4">{template.description}</p>
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">
                  Basic Information
                </h1>
                <p className="text-xl text-slate-300">
                  Tell us about your business.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="siteName"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Site Name
                      </label>
                      <input
                        type="text"
                        id="siteName"
                        value={formData.siteName}
                        onChange={(e) =>
                          setFormData({ ...formData, siteName: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="My Awesome Doors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Acme Doors Inc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">
                  Branding
                </h1>
                <p className="text-xl text-slate-300">
                  Choose your brand colors.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="primaryColor"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Primary Color
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          id="primaryColor"
                          value={formData.primaryColor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-12 h-12 rounded border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.primaryColor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="accentColor"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Accent Color
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          id="accentColor"
                          value={formData.accentColor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              accentColor: e.target.value,
                            })
                          }
                          className="w-12 h-12 rounded border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.accentColor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              accentColor: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">
                  Review & Launch
                </h1>
                <p className="text-xl text-slate-300">
                  Review your site details before launching.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Template
                    </h3>
                    <p className="text-slate-300">
                      {templates.find((t) => t.id === formData.template)?.name}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Site Details
                    </h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-slate-400">Site Name</dt>
                        <dd className="text-slate-300">{formData.siteName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-slate-400">Company Name</dt>
                        <dd className="text-slate-300">{formData.companyName}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Brand Colors
                    </h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: formData.primaryColor }}
                        />
                        <div className="text-sm text-slate-400 mt-1">Primary</div>
                      </div>
                      <div>
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: formData.accentColor }}
                        />
                        <div className="text-sm text-slate-400 mt-1">Accent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-12">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={step === 4 ? handleSubmit : handleNext}
          disabled={loading || (step === 1 && !formData.template)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Creating Site...
            </>
          ) : step === 4 ? (
            <>
              Launch Site
              <ArrowRight size={20} />
            </>
          ) : (
            <>
              Continue
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}