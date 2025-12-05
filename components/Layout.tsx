import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { categories } from '../data';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For demo, just go to blog with a query param log (functionality would be added)
      navigate(`/blog?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm py-2' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center leading-none z-50 group select-none">
              <span className="text-2xl font-serif font-medium tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">Azeem</span>
              <span className="text-2xl font-serif font-medium tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors -mt-1.5">Insights</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>Home</NavLink>
              <NavLink to="/blog" className={({isActive}) => `text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>Blog</NavLink>
              <NavLink to="/about" className={({isActive}) => `text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>About</NavLink>
              <NavLink to="/contact" className={({isActive}) => `text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>Contact</NavLink>
              
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-2"></div>
              
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                <Search size={18} />
              </button>
              <button onClick={() => setIsDark(!isDark)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden z-50 text-zinc-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 shadow-md p-4 animate-in slide-in-from-top-2">
            <div className="container mx-auto max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-4 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 outline-none transition-all dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-40 flex flex-col justify-center items-center p-8 space-y-8 md:hidden animate-in fade-in duration-200">
            <NavLink onClick={() => setIsMenuOpen(false)} to="/" className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Home</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/blog" className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Blog</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/about" className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">About</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/contact" className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Contact</NavLink>
            <div className="flex gap-6 mt-8">
              <button onClick={() => { setIsDark(!isDark); setIsMenuOpen(false); }} className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-28 md:pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-20 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex flex-col items-center leading-none mb-6 select-none">
                <span className="text-2xl font-serif font-medium tracking-tight text-zinc-900 dark:text-white">Azeem</span>
                <span className="text-2xl font-serif font-medium tracking-tight text-zinc-900 dark:text-white -mt-1.5">Insights</span>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm leading-relaxed">
                Deep thoughts, practical wisdom, and powerful ideas for modern life. Curated for those who seek more than just the surface.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Explore</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">About Me</Link></li>
                <li><Link to="/blog" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">All Articles</Link></li>
                <li><Link to="/contact" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Categories</h4>
              <ul className="space-y-3">
                {categories.slice(0, 5).map(cat => (
                  <li key={cat}>
                    <Link to={`/category/${cat.toLowerCase()}`} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 dark:text-zinc-500">
            <p>&copy; {new Date().getFullYear()} AzeemInsights. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;