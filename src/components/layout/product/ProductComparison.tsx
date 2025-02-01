import React from 'react';
import { Plus, Minus, Check, X, Info } from 'lucide-react';

interface Feature {
  name: string;
  description?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  features: Record<string, boolean | string>;
}

interface ProductComparisonProps {
  products: Product[];
  features: Feature[];
  onRemoveProduct: (id: string) => void;
  onAddProduct: () => void;
  maxProducts?: number;
}

export function ProductComparison({
  products,
  features,
  onRemoveProduct,
  onAddProduct,
  maxProducts = 4
}: ProductComparisonProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Compare Products</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-6 text-left text-sm font-medium text-gray-500 bg-gray-50 border-b border-r min-w-[200px]">
                Product Details
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-6 text-left border-b min-w-[250px]">
                  <div className="relative">
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
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
                      <span className="text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </th>
              ))}
              {products.length < maxProducts && (
                <th className="p-6 text-center border-b min-w-[250px]">
                  <button
                    onClick={onAddProduct}
                    className="w-full aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center mb-4"
                  >
                    <Plus size={24} className="text-gray-400" />
                  </button>
                  <p className="text-sm text-gray-500">Add product to compare</p>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {features.map((feature) => (
              <tr key={feature.name}>
                <td className="p-6 bg-gray-50 border-r">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{feature.name}</span>
                    {feature.description && (
                      <div className="group relative">
                        <Info size={16} className="text-gray-400" />
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {feature.description}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                {products.map((product) => (
                  <td key={`${product.id}-${feature.name}`} className="p-6">
                    {typeof product.features[feature.name] === 'boolean' ? (
                      product.features[feature.name] ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Minus size={20} className="text-gray-300" />
                      )
                    ) : (
                      <span className="text-gray-600">
                        {product.features[feature.name]}
                      </span>
                    )}
                  </td>
                ))}
                {products.length < maxProducts && <td className="p-6" />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}