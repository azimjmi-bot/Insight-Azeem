import React from 'react';
import { BlogPost } from '../types';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  post: BlogPost;
  variant?: 'grid' | 'list';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <Link to={`/article/${post.slug}`} className="group flex flex-col md:flex-row gap-6 items-start py-8 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors p-4 rounded-lg">
        <div className="flex-1 order-2 md:order-1">
          <div className="flex items-center gap-3 mb-2">
             <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">{post.category}</span>
             <span className="text-zinc-300 dark:text-zinc-700">•</span>
             <span className="text-xs text-zinc-400 dark:text-zinc-500">{post.date}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-3">
            {post.title}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-500">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </div>
        </div>
        <div className="w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-md order-1 md:order-2">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
      </Link>
    );
  }

  // Grid Variant
  return (
    <Link to={`/article/${post.slug}`} className="group flex flex-col h-full bg-transparent">
      <div className="overflow-hidden rounded-lg mb-4 aspect-[16/10]">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">{post.category}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-500">
            <Clock size={12} className="mr-1" />
            {post.readTime}
          </div>
          <span className="flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform">
            Read <ArrowRight size={14} className="ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;