import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  withFilters?: boolean;
}

export function ProductGrid({ products, columns = 3, withFilters = false }: ProductGridProps) {
  const [sortBy, setSortBy] = React.useState('featured');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  return (
    <div>
      {withFilters && (
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
            <div className="text-sm text-gray-500">
              Showing {products.length} products
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${view === 'grid' ? gridCols[columns] : ''} gap-8`}>
        {products.map((product) => (
          <div
            key={product.id}
            className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors ${
              view === 'list' ? 'flex' : ''
            }`}
          >
            {/* Product Image */}
            <div className={`relative aspect-square ${view === 'list' ? 'w-72 shrink-0' : ''}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                    Sale
                  </span>
                )}
              </div>
              {/* Quick actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                  <Eye size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <Link
                to={`/products/${product.id}`}
                className="block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2"
              >
                {product.name}
              </Link>
              <div className="text-sm text-gray-500 mb-4">{product.description}</div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < product.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {product.isSale && product.salePrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  )}
                </div>
                <button
                  disabled={!product.inStock}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}