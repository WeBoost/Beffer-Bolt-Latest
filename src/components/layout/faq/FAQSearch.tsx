import React from 'react';
import { Search, Command } from 'lucide-react';

interface SearchResult {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSearchProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
  onResultClick: (id: string) => void;
  placeholder?: string;
}

export function FAQSearch({
  onSearch,
  onResultClick,
  placeholder = "Search frequently asked questions..."
}: FAQSearchProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim().length > 2) {
      setIsLoading(true);
      try {
        const searchResults = await onSearch(value);
        setResults(searchResults);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleResultClick = (id: string) => {
    onResultClick(id);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-12 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
            <Command size={12} className="inline mr-1" />K
          </kbd>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (query.trim().length > 2 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full px-4 py-2 hover:bg-gray-50 text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{result.question}</h4>
                    {result.category && (
                      <span className="text-sm text-gray-500">
                        {result.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.answer.replace(/<[^>]*>/g, '')}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}