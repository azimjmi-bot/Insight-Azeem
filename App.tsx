import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import About from './pages/About';
import Contact from './pages/Contact';

// Categories just filter the blog list in this simple version
import { posts } from './data';

const CategoryPage: React.FC<{ category: string }> = ({ category }) => {
    // This is a wrapper to simulate a category page using the Blog component logic or specialized logic
    // In a real app, this would query backend. Here we just redirect or show filtered Blog.
    // However, to keep it clean, let's reuse Blog but force a filter visual
    // Note: In a real app with proper routing, we'd pass props to Blog or use URL params. 
    // Since Blog handles 'q' param, let's just make a specific category view.
    
    // We will redirect to blog with query for simplicity in this static demo, 
    // OR create a specific filter view. Let's create a specific filter view inline for simplicity.
    const filtered = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl animate-in fade-in duration-500">
             <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-4 block">Category</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white mb-6 capitalize">
                {category}
                </h1>
            </div>
            <div className="space-y-4">
                 {filtered.map(post => (
                    // We need to import ArticleCard here or pass it down. 
                    // To avoid circular dependency or import issues in this specific single-file structure logic,
                    // I'll rely on the Router structure in App to just route everything correctly.
                    // But wait, I can't import ArticleCard inside App function body easily.
                    // Instead, I'll use the Router to direct /category/:cat to a wrapper component.
                    null
                 ))}
                 {/* 
                   Wait, this approach is messy for the XML output. 
                   Better approach: Map /category/:id to a component that imports ArticleCard.
                 */}
            </div>
        </div>
    )
}

// Wrapper for category to use the existing Blog component but with a filter prop? 
// Or just let Blog handle it. Let's make Blog handle generic lists.
// To satisfy the "Category Pages" requirement cleanly:
const CategoryRoute = () => {
    // We need to extract params here
    // But we are in top level.
    // Let's make a simplified Category component in a separate block if we were real.
    // For this strict file limit, let's make Blog smarter.
    return <Blog />
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:slug" element={<Article />} />
          {/* Re-using Blog component for categories, it can parse URL or props */}
          <Route path="/category/:cat" element={<CategoryWrapper />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

// Helper component to filter posts by category
import { useParams } from 'react-router-dom';
import ArticleCard from './components/ArticleCard';

const CategoryWrapper: React.FC = () => {
    const { cat } = useParams<{ cat: string }>();
    const categoryName = cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : '';
    
    // Normalize category comparison
    const filteredPosts = posts.filter(p => p.category.toLowerCase() === cat?.toLowerCase());

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl animate-in fade-in duration-500">
            <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-4 block">Browsing Category</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white mb-6 capitalize">
                    {categoryName}
                </h1>
            </div>
             <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <ArticleCard key={post.id} post={post} variant="list" />
                ))
                ) : (
                <div className="text-center py-20 text-zinc-500">No articles found in this category.</div>
                )}
            </div>
        </div>
    );
}

export default App;