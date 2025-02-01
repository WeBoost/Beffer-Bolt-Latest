import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Filter {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count: number;
  }[];
}

interface CategoryLayoutProps {
  categories: Category[];
  filters: Filter[];
  children: React.ReactNode;
}

export function CategoryLayout({ categories, filters, children }: CategoryLayoutProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});

  const toggleFilter = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [filterId]: updated
      };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="flex gap-8">
      {/* Mobile filter dialog */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                categories={categories}
                filters={filters}
                activeFilters={activeFilters}
                onFilterToggle={toggleFilter}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop filters */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterSidebar
          categories={categories}
          filters={filters}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Filter size={20} />
            Show Filters
          </button>
        </div>

        {/* Active filters */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterId, values]) =>
              values.map((value) => {
                const filter = filters.find((f) => f.id === filterId);
                const option = filter?.options.find((o) => o.value === value);
                return (
                  <button
                    key={`${filterId}-${value}`}
                    onClick={() => toggleFilter(filterId, value)}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-1 hover:bg-blue-100 transition-colors"
                  >
                    {filter?.name}: {option?.label}
                    <X size={14} />
                  </button>
                );
              })
            )}
            <button
              onClick={clearFilters}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

interface FilterSidebarProps {
  categories: Category[];
  filters: Filter[];
  activeFilters: Record<string, string[]>;
  onFilterToggle: (filterId: string, value: string) => void;
  onClearFilters: () => void;
}

function FilterSidebar({
  categories,
  filters,
  activeFilters,
  onFilterToggle,
  onClearFilters
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span>{category.name}</span>
              <div className="flex items-center gap-2 text-gray-400">
                <span>({category.count})</span>
                <ChevronRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters */}
      {filters.map((filter) => (
        <div key={filter.id}>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{filter.name}</h3>
          <div className="space-y-2">
            {filter.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(activeFilters[filter.id] || []).includes(option.value)}
                  onChange={() => onFilterToggle(filter.id, option.value)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">{option.label}</span>
                <span className="text-sm text-gray-400">({option.count})</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}