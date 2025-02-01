import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    price: '£29',
    description: 'Everything you need to start selling doors online',
    features: [
      'Basic website template',
      '2D door configurator',
      'Up to 50 products',
      'Basic analytics',
      'Email support',
      'SSL security',
      'Mobile responsive',
      'SEO optimization'
    ]
  },
  {
    name: 'Professional',
    price: '£99',
    description: 'Advanced features for growing manufacturers',
    features: [
      'All Basic features',
      '3D door configurator',
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Custom domain',
      'API access',
      'Team management',
      'Inventory tracking',
      'Custom branding'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '£299',
    description: 'Custom solutions for large manufacturers',
    features: [
      'All Professional features',
      'White-label solution',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Advanced security',
      'Multi-site management',
      'Training sessions',
      'Custom reporting',
      'Volume discounts'
    ]
  }
];

export function Pricing() {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the perfect plan for your door manufacturing business.
            All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-slate-800/50 rounded-xl p-8 border ${
                tier.highlighted
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-slate-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-slate-300">{tier.description}</p>
              </div>
              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-300 mb-4">
                  What's included
                </h4>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-1 text-blue-500 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/register?plan=${tier.name.toLowerCase()}`}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition-colors ${
                  tier.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-slate-300 mb-8">
            Contact our sales team for a tailored package that meets your specific needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Contact Sales
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}