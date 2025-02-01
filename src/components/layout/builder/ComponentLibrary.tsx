import React from 'react';
import { Search, Filter, Plus, Settings, Move, Eye, Copy, Trash2 } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  isCustom?: boolean;
}

interface ComponentLibraryProps {
  components: Component[];
  onAddComponent: (id: string) => void;
  onEditComponent?: (id: string) => void;
  onDuplicateComponent?: (id: string) => void;
  onDeleteComponent?: (id: string) => void;
  onPreviewComponent: (id: string) => void;
}

export function ComponentLibrary({
  components,
  onAddComponent,
  onEditComponent,
  onDuplicateComponent,
  onDeleteComponent,
  onPreviewComponent
}: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const categories = Array.from(
    new Set(components.map((component) => component.category))
  );

  const filteredComponents = components.filter((component) => {
    const matchesSearch = component.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || component.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Component Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="bg-white rounded-lg border hover:border-gray-300 transition-colors p-4"
            >
              <div className="relative aspect-video mb-4 group">
                <img
                  src={component.thumbnail}
                  alt={component.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => onPreviewComponent(component.id)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => onAddComponent(component.id)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{component.name}</h3>
                  <span className="text-sm text-gray-500">
                    {component.category}
                  </span>
                </div>
                {component.isCustom && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditComponent?.(component.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Settings size={16} />
                    </button>
                    <button
                      onClick={() => onDuplicateComponent?.(component.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteComponent?.(component.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600">{component.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}