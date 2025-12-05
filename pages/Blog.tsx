import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { posts, categories } from '../data';
import { Link, useSearchParams } from 'react-router-dom';

const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const filteredPosts = query 
    ? posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
    : posts;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white mb-6">
          {query ? `Search Results: "${query}"` : 'All Articles'}
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          Explore the archive of thoughts, strategies, and lessons.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        <Link to="/blog" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!query ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}>
          All
        </Link>
        {categories.map(cat => (
          <Link 
            key={cat}
            to={`/category/${cat.toLowerCase()}`}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <ArticleCard key={post.id} post={post} variant="list" />
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No articles found matching your criteria.</p>
            <Link to="/blog" className="text-zinc-900 dark:text-white font-medium mt-4 inline-block border-b border-zinc-900 dark:border-white">Clear search</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;