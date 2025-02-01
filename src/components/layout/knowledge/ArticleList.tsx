import React from 'react';
import { Search, Book, ArrowRight, Star, Clock, Eye } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  views: number;
  helpful: number;
  lastUpdated: string;
  readTime: number;
}

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (id: string) => void;
}

export function ArticleList({ articles, onArticleClick }: ArticleListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = Array.from(
    new Set(articles.map((article) => article.category))
  );

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg border hover:border-gray-300 transition-colors p-6 cursor-pointer"
            onClick={() => onArticleClick(article.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Book className="text-blue-600" size={20} />
                <span className="text-sm text-gray-600">{article.category}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  {article.views}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} />
                  {article.helpful}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>Updated {article.lastUpdated}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}