
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { posts, categories } from '../data';

const Home: React.FC = () => {
  const featuredPosts = posts.slice(0, 3);
  
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold tracking-widest uppercase mb-6">
          Ideas. Insights. Impact.
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-medium text-zinc-900 dark:text-white mb-8 leading-tight">
          Deep thoughts for <br/> <span className="italic text-zinc-500 dark:text-zinc-400">modern life.</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Practical wisdom on mental wellness, mindset, and business strategy. No fluff, just actionable ideas.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/blog" className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
            Start Reading
          </Link>
          <Link to="/about" className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-full font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Meet Azeem
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">Featured Insights</h2>
            <Link to="/blog" className="hidden md:flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link to="/blog" className="inline-flex items-center text-zinc-900 dark:text-white font-medium">
              View all articles <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800/50 border-y border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white mb-12 text-center">Explore Topics</h2>
           <div className="flex flex-wrap justify-center gap-4">
             {categories.map(cat => (
               <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`}
                className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all hover:-translate-y-1 shadow-sm"
               >
                 {cat}
               </Link>
             ))}
           </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
          <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] rounded-xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/azeem/800/800" 
              alt="Abdul Azeem" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white mb-6">Hi, I'm Abdul Azeem.</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              I write about the intersection of mindset, productivity, and modern business. My goal is to help you think clearer and act faster.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              This blog is a collection of my deepest thoughts and most practical discoveries.
            </p>
            <Link to="/about" className="text-zinc-900 dark:text-white font-bold border-b-2 border-zinc-900 dark:border-white pb-1 hover:opacity-70 transition-opacity">
              Read My Story
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <Mail size={48} className="mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the Inner Circle</h2>
          <p className="text-zinc-400 dark:text-zinc-600 text-lg mb-8">
            Get one powerful idea delivered to your inbox every week. No spam, just value.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-lg bg-zinc-800 dark:bg-zinc-100 border border-zinc-700 dark:border-zinc-300 text-white dark:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <button className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">Join 10,000+ other deep thinkers.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;