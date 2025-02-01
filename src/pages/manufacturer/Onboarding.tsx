import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, Mail, Phone, Globe, Package, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface OnboardingData {
  company_name: string;
  description: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  subscription_tier: 'basic' | 'premium' | 'enterprise';
}

const subscriptionTiers = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small manufacturers',
    price: '$99/month',
    features: [
      'Up to 50 products',
      'Basic analytics',
      'Email support',
      'Standard pricing tools'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For growing manufacturers',
    price: '$299/month',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Advanced pricing tools',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large manufacturers',
    price: 'Custom pricing',
    features: [
      'Custom solutions',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'Volume discounts'
    ]
  }
];

export function ManufacturerOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    company_name: '',
    description: '',
    website: '',
    contact_email: user?.email || '',
    contact_phone: '',
    subscription_tier: 'basic'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Create manufacturer profile
      const { error: profileError } = await supabase
        .from('manufacturers')
        .insert([{
          user_id: user.id,
          ...formData
        }]);

      if (profileError) throw profileError;

      // Redirect to dashboard
      navigate('/manufacturer/dashboard');
    } catch (error) {
      console.error('Error creating manufacturer profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2].map((number) => (
              <div
                key={number}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {step === 1 ? (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome to the Manufacturer Portal
              </h1>
              <p className="text-xl text-slate-300">
                Let's get your account set up
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Contact Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://"
                    />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-white mb-4">
                Choose Your Subscription
              </h1>
              <p className="text-xl text-slate-300">
                Select the plan that best fits your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {subscriptionTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setFormData({ ...formData, subscription_tier: tier.id as any })}
                  className={`bg-slate-800/50 rounded-xl p-6 border text-left transition-colors ${
                    formData.subscription_tier === tier.id
                      ? 'border-blue-500'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-300 mb-4">{tier.description}</p>
                  <p className="text-2xl font-bold text-white mb-6">{tier.price}</p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Package size={16} className="text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {formData.subscription_tier === tier.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <DollarSign size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}