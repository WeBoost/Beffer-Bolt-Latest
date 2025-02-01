import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
}

interface FAQGridProps {
  categories: FAQCategory[];
  onCategoryClick: (id: string) => void;
}

export function FAQGrid({ categories, onCategoryClick }: FAQGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          className="bg-white p-6 rounded-lg border hover:border-gray-300 transition-colors text-left group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            {category.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {category.count} questions
            </span>
            <ArrowRight
              size={20}
              className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
            />
          </div>
        </button>
      ))}
    </div>
  );
}