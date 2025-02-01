import React from 'react';
import { ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductHeroProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  features?: string[];
  salePrice?: number;
}

export function ProductHero({
  title,
  description,
  price,
  rating,
  reviews,
  image,
  features = [],
  salePrice
}: ProductHeroProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                </div>
                <span className="text-gray-600">({reviews} reviews)</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8">{description}</p>

            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-blue-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-end gap-4 mb-8">
              {salePrice ? (
                <>
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ${salePrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${price}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                    Save ${price - salePrice}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${price}</span>
              )}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Configure
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}