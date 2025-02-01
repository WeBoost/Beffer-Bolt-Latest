import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SimpleHeroProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  overlay?: boolean;
}

export function SimpleHero({
  title,
  description,
  ctaText = 'Get Started',
  ctaLink = '/',
  image = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
  overlay = true
}: SimpleHeroProps) {
  return (
    <div className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90" />
        )}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {description}
          </p>
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
          >
            {ctaText}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}