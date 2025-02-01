import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const posts = [
  {
    title: "The Future of Door Manufacturing: AI and Automation",
    excerpt: "Discover how artificial intelligence is revolutionizing the door manufacturing industry...",
    date: "2024-01-28",
    author: "Sarah Johnson",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1516972810927-80185027ca84?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Sustainable Door Manufacturing: A Complete Guide",
    excerpt: "Learn about eco-friendly materials and sustainable manufacturing practices...",
    date: "2024-01-25",
    author: "Michael Chen",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Top Door Design Trends for 2024",
    excerpt: "Stay ahead of the curve with these emerging door design trends...",
    date: "2024-01-22",
    author: "Emma Wilson",
    category: "Design Trends",
    image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2670&auto=format&fit=crop"
  }
];

export function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Blog & Resources</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Stay up to date with the latest industry insights and door manufacturing trends
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <article key={index} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors group">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {post.author}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-300 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm text-blue-400">
                  <Tag size={16} />
                  {post.category}
                </span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
                  Read more
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          View All Articles
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}