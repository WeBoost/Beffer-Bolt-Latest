import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: Product[];
  onRemoveProduct: (id: string) => void;
  onCompare: () => void;
  maxProducts?: number;
}

export function ComparisonDrawer({
  isOpen,
  onClose,
  selectedProducts,
  onRemoveProduct,
  onCompare,
  maxProducts = 4
}: ComparisonDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-gray-900">Compare Products</h2>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {selectedProducts.length} of {maxProducts}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-4 overflow-x-auto pb-4">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 bg-gray-50 rounded-lg p-4 relative"
                >
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              ))}
              {selectedProducts.length < maxProducts && (
                <div className="flex-shrink-0 w-48">
                  <button className="w-full h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center">
                    <Plus size={24} className="text-gray-400" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Select up to {maxProducts} products to compare
              </p>
              <button
                onClick={onCompare}
                disabled={selectedProducts.length < 2}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Compare Products
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}