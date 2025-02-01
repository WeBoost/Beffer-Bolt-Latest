import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Building2, Filter, Package, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Manufacturer {
  id: string;
  company_name: string;
  description: string;
  rating: number;
  review_count: number;
  verified: boolean;
  distance?: number;
  categories: string[];
  location_city: string;
  location_state: string;
}

export function ManufacturerSearch() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  useEffect(() => {
    const searchManufacturers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc('search_manufacturers', {
          search_query: searchQuery || null,
          category_filter: categoryFilter || null,
          lat: userLocation?.lat || null,
          lon: userLocation?.lon || null,
          min_rating: minRating,
          verified_only: verifiedOnly
        });

        if (error) throw error;
        setManufacturers(data || []);
      } catch (error) {
        console.error('Error searching manufacturers:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchManufacturers, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, categoryFilter, minRating, verifiedOnly, userLocation]);

  const handleConnect = async (manufacturerId: string) => {
    try {
      const { error } = await supabase
        .from('supplier_manufacturer_links')
        .insert([{
          manufacturer_id: manufacturerId,
          supplier_id: supabase.auth.user()?.id
        }]);

      if (error) throw error;
      navigate(`/supplier/manufacturers/${manufacturerId}`);
    } catch (error) {
      console.error('Error connecting with manufacturer:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Find Door Manufacturers
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Connect with verified manufacturers and expand your product offerings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search manufacturers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="interior">Interior Doors</option>
            <option value="exterior">Exterior Doors</option>
            <option value="security">Security Doors</option>
            <option value="fire">Fire Rated Doors</option>
          </select>

          <select
            value={minRating?.toString() || ''}
            onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-300">Verified Manufacturers Only</span>
          </label>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Searching manufacturers...</p>
        </div>
      ) : manufacturers.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No manufacturers found</h2>
          <p className="text-slate-300">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manufacturers.map((manufacturer) => (
            <div
              key={manufacturer.id}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">
                    {manufacturer.company_name}
                  </h3>
                  {manufacturer.verified && (
                    <div className="flex items-center gap-1 text-blue-400">
                      <CheckCircle size={16} />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 mb-4 line-clamp-2">
                  {manufacturer.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={16} />
                    <span>
                      {manufacturer.location_city}, {manufacturer.location_state}
                      {manufacturer.distance && (
                        <span className="ml-1 text-slate-500">
                          ({Math.round(manufacturer.distance)} km away)
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(manufacturer.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-slate-400">
                      ({manufacturer.review_count} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {manufacturer.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate(`/supplier/manufacturers/${manufacturer.id}`)}
                    className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Package size={20} />
                    View Products
                  </button>
                  <button
                    onClick={() => handleConnect(manufacturer.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Connect
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}