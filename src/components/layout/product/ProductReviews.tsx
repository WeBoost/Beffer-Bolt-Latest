import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  helpful: number;
  image?: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
  ratingBreakdown
}: ProductReviewsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.round(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
              </div>
              <div className="text-gray-600">Based on {totalReviews} reviews</div>
            </div>

            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-24">
                    {item.rating}
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-sm text-gray-600">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {review.author[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {review.author}
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{review.content}</p>

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <ThumbsUp size={16} />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <MessageSquare size={16} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}