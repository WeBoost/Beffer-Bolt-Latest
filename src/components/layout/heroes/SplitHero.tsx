import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SplitHeroProps {
  title: string;
  description: string;
  image: string;
  stats?: {
    label: string;
    value: string;
  }[];
  ctaText?: string;
  ctaLink?: string;
  reversed?: boolean;
}

export function SplitHero({
  title,
  description,
  image,
  stats,
  ctaText = 'Get Started',
  ctaLink = '/',
  reversed = false
}: SplitHeroProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 ${reversed ? 'direction-rtl' : ''}`}>
          {/* Content */}
          <div className="flex items-center p-12 lg:p-16">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
              <p className="text-xl text-gray-600 mb-8">{description}</p>

              {stats && (
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
              >
                {ctaText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={image}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}