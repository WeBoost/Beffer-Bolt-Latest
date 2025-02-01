import React from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, ArrowRight, Info } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
}

interface ProductSpecification {
  label: string;
  value: string;
}

interface ProductDetailProps {
  name: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviews: number;
  specifications: ProductSpecification[];
  features: string[];
  relatedProducts?: React.ReactNode;
}

export function ProductDetail({
  name,
  description,
  images,
  variants,
  rating,
  reviews,
  specifications,
  features,
  relatedProducts
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);
  const [selectedVariant, setSelectedVariant] = React.useState(variants[0]);
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage.id === image.id
                      ? 'border-blue-600'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
              <div className="flex items-center gap-4 mb-4">
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
                  <a href="#reviews" className="text-gray-600 hover:text-gray-900">
                    ({reviews} reviews)
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Heart size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-lg text-gray-600">{description}</p>
            </div>

            {/* Variants */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Select Variant
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedVariant.id === variant.id
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {variant.name}
                    </div>
                    <div className="flex items-center gap-2">
                      {variant.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            ${variant.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${variant.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${variant.price}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-20 px-3 py-2 text-center border border-gray-200 rounded-lg"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <button
                disabled={!selectedVariant.inStock}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                {selectedVariant.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Configure
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="text-blue-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $1000</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-medium text-gray-900">10 Year Warranty</h4>
                  <p className="text-sm text-gray-600">100% guarantee</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="border-t pt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Info size={16} className="text-gray-400 shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {spec.label}
                      </div>
                      <div className="text-sm text-gray-600">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-600">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && (
          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            {relatedProducts}
          </div>
        )}
      </div>
    </div>
  );
}