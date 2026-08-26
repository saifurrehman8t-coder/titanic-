import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Bookmark, Clock, Award, Sun, Moon, DollarSign, Code, Menu, X, Anchor } from 'lucide-react';
import { Category, BlogPost } from '../types';

interface NavbarProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'blogs' | 'timeline' | 'quiz' | 'bookmarks';
  setActiveTab: (tab: 'blogs' | 'timeline' | 'quiz' | 'bookmarks') => void;
  theme: 'dark' | 'vintage';
  onToggleTheme: () => void;
  adMode: boolean;
  onToggleAdMode: () => void;
  onOpenSeoInspector: () => void;
  allPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
  adMode,
  onToggleAdMode,
  onOpenSeoInspector,
  allPosts,
  onSelectPost,
  bookmarksCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auto suggest posts matching search query
  const suggestions = searchQuery.trim().length > 1
    ? allPosts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 shadow-lg">
      {/* Top Banner - Cleaned & Mobile Friendly (Monetization status line removed as requested) */}
      <div className="bg-slate-950/90 border-b border-amber-500/10 py-1.5 px-3 md:px-4 text-xs">
        <div className="container flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 text-amber-300/90 font-mono text-[11px] sm:text-xs">
            <Anchor size={12} className="text-amber-400 shrink-0" />
            <span className="truncate">Titanic Chronicles Archives</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleAdMode}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-all ${
                adMode 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
              title="Toggle AdSense visual preview"
            >
              <DollarSign size={11} />
              <span className="hidden xs:inline">{adMode ? 'Ad Preview: ON' : 'Ad Preview: OFF'}</span>
              <span className="xs:hidden">{adMode ? 'Ads ON' : 'Ads OFF'}</span>
            </button>

            <button
              onClick={onOpenSeoInspector}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] sm:text-[11px] font-medium"
              title="Inspect SEO Schema"
            >
              <Code size={11} /> <span className="hidden xs:inline">SEO Schema</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-1 rounded text-amber-300 hover:text-amber-100 transition-colors"
              title="Toggle Dark / Sepia Theme"
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('blogs'); onSelectCategory('All'); window.scrollTo(0,0); }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
              ⚓
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-wider gold-gradient-text leading-none">
                TITANIC CHRONICLES
              </h1>
              <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-0.5">
                1912 Historic Archives
              </p>
            </div>
          </div>

          {/* Search Bar with Instant Suggestions (Desktop) */}
          <div className="hidden lg:block relative w-72 xl:w-80" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search articles, passengers..."
                className="w-full bg-slate-900/90 text-gray-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-amber-500/30 focus:outline-none focus:border-amber-400"
              />
              <Search size={13} className="absolute left-2.5 top-2 text-amber-400/70" />
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-amber-500/40 rounded-lg shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-gray-800 text-[10px] text-amber-400 uppercase font-mono tracking-wider">
                  Matching Articles ({suggestions.length})
                </div>
                <div className="divide-y divide-gray-800/60 max-h-72 overflow-y-auto">
                  {suggestions.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        onSelectPost(post);
                        setSearchFocused(false);
                      }}
                      className="p-2.5 hover:bg-amber-500/10 cursor-pointer transition-colors text-left"
                    >
                      <h4 className="text-xs font-semibold text-gray-200 line-clamp-1">{post.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{post.excerpt}</p>
                      <span className="text-[10px] text-amber-400 font-mono mt-0.5 inline-block">{post.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'blogs' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-gray-300 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Compass size={13} /> Blog Archives
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'timeline' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-gray-300 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Clock size={13} /> 1912 Timeline
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-gray-300 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Award size={13} /> History Quiz
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all relative ${
                activeTab === 'bookmarks' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-gray-300 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Bookmark size={13} /> Saved
              {bookmarksCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ml-1">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-amber-400 hover:bg-slate-800 rounded-lg border border-amber-500/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-amber-500/20 space-y-3 animate-fade-in text-left">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 50+ articles..."
                className="w-full bg-slate-900 text-gray-200 text-xs pl-8 pr-3 py-2 rounded-lg border border-amber-500/30"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveTab('blogs'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-xs font-semibold text-left border flex items-center gap-1.5 ${
                  activeTab === 'blogs' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-gray-300 border-gray-800'
                }`}
              >
                📜 Blog Archives
              </button>
              <button
                onClick={() => { setActiveTab('timeline'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-xs font-semibold text-left border flex items-center gap-1.5 ${
                  activeTab === 'timeline' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-gray-300 border-gray-800'
                }`}
              >
                ⏱️ 1912 Timeline
              </button>
              <button
                onClick={() => { setActiveTab('quiz'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-xs font-semibold text-left border flex items-center gap-1.5 ${
                  activeTab === 'quiz' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-gray-300 border-gray-800'
                }`}
              >
                🏆 History Quiz
              </button>
              <button
                onClick={() => { setActiveTab('bookmarks'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-xs font-semibold text-left border flex items-center gap-1.5 ${
                  activeTab === 'bookmarks' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-gray-300 border-gray-800'
                }`}
              >
                🔖 Saved ({bookmarksCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
