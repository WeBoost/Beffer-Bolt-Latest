import React from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Printer, Clock, Eye, MessageSquare } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
  readTime: number;
  views: number;
  helpful: number;
  notHelpful: number;
  relatedArticles: {
    id: string;
    title: string;
  }[];
}

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onHelpful: (helpful: boolean) => void;
  onRelatedArticleClick: (id: string) => void;
  onContactSupport: () => void;
}

export function ArticleView({
  article,
  onBack,
  onHelpful,
  onRelatedArticleClick,
  onContactSupport
}: ArticleViewProps) {
  const [hasVoted, setHasVoted] = React.useState(false);

  const handleVote = (helpful: boolean) => {
    if (!hasVoted) {
      setHasVoted(true);
      onHelpful(helpful);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Articles
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            Updated {article.lastUpdated}
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            {article.views} views
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {article.readTime} min read
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-blue max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Feedback */}
      <div className="border-t border-b py-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Was this article helpful?
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote(true)}
            disabled={hasVoted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasVoted
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsUp size={20} />
            Yes ({article.helpful})
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={hasVoted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasVoted
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsDown size={20} />
            No ({article.notHelpful})
          </button>
          <div className="flex-1" />
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Printer size={20} className="text-gray-600" />
          </button>
        </div>
        {hasVoted && (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">
              Thanks for your feedback! Still need help?
            </p>
            <button
              onClick={onContactSupport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare size={20} />
              Contact Support
            </button>
          </div>
        )}
      </div>

      {/* Related Articles */}
      {article.relatedArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {article.relatedArticles.map((related) => (
              <button
                key={related.id}
                onClick={() => onRelatedArticleClick(related.id)}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <h3 className="font-medium text-gray-900 mb-1">{related.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ArrowRight size={16} />
                  Read article
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}