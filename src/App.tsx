import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from './data/blogPosts';
import { Category, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { PostCard } from './components/PostCard';
import { ArticleView } from './components/ArticleView';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { TitanicQuiz } from './components/TitanicQuiz';
import { Footer } from './components/Footer';
import { AdSlot } from './components/AdSlot';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { Compass, Sparkles, Filter, Bookmark, Flame, ArrowUpRight, Anchor, RefreshCw } from 'lucide-react';

const CATEGORIES: Category[] = [
  'Construction & Shipyard',
  'First-Class Luxury',
  'Steerage & Immigrants',
  'Key Figures & Crew',
  'Maiden Voyage',
  'Sinking Chronology',
  'Heroism & Tragedy',
  'Rescue & Inquiries',
  'Wreck Exploration',
  'Myths & Pop Culture'
];

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'timeline' | 'quiz' | 'bookmarks'>('blogs');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'readTime'>('latest');
  
  // Theme state: dark oceanic vs sepia vintage paper
  const [theme, setTheme] = useState<'dark' | 'vintage'>(() => {
    return (localStorage.getItem('titanic_theme') as 'dark' | 'vintage') || 'dark';
  });

  // AdSense preview simulator mode
  const [adMode, setAdMode] = useState<boolean>(true);

  // SEO Inspector modal state
  const [seoModalOpen, setSeoModalOpen] = useState(false);

  // LocalStorage saved bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('titanic_bookmarks');
    return saved ? JSON.parse(saved) : ['post-1', 'post-6'];
  });

  useEffect(() => {
    localStorage.setItem('titanic_theme', theme);
    if (theme === 'vintage') {
      document.body.classList.add('theme-vintage');
    } else {
      document.body.classList.remove('theme-vintage');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('titanic_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarkedIds.includes(post.id)) {
      setBookmarkedIds(bookmarkedIds.filter(id => id !== post.id));
    } else {
      setBookmarkedIds([...bookmarkedIds, post.id]);
    }
  };

  // Filter posts
  let filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  if (sortBy === 'popular') {
    filteredPosts = [...filteredPosts].sort((a, b) => b.views - a.views);
  } else if (sortBy === 'readTime') {
    filteredPosts = [...filteredPosts].sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
  }

  // Bookmarked posts
  const bookmarkedPosts = BLOG_POSTS.filter(post => bookmarkedIds.includes(post.id));

  // Featured post for Hero Header
  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => { setSelectedCategory(cat); setSelectedPost(null); }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={(tab) => { setActiveTab(tab); setSelectedPost(null); }}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'vintage' : 'dark')}
          adMode={adMode}
          onToggleAdMode={() => setAdMode(!adMode)}
          onOpenSeoInspector={() => setSeoModalOpen(true)}
          allPosts={BLOG_POSTS}
          onSelectPost={(post) => { setSelectedPost(post); setActiveTab('blogs'); window.scrollTo(0,0); }}
          bookmarksCount={bookmarkedIds.length}
        />

        {/* If viewing single article */}
        {selectedPost ? (
          <ArticleView
            post={selectedPost}
            onBack={() => setSelectedPost(null)}
            isBookmarked={bookmarkedIds.includes(selectedPost.id)}
            onToggleBookmark={toggleBookmark}
            adMode={adMode}
            allPosts={BLOG_POSTS}
            onSelectPost={(post) => { setSelectedPost(post); window.scrollTo(0,0); }}
            onOpenSeoInspector={() => setSeoModalOpen(true)}
          />
        ) : (
          /* Main Views based on Active Tab */
          <div>
            {activeTab === 'blogs' && (
              <main className="container py-8 space-y-10 animate-fade-in text-left">
                
                {/* Hero Header Banner */}
                {selectedCategory === 'All' && !searchQuery && (
                  <section className="space-y-8">
                    <div className="glass-panel p-6 md:p-10 rounded-2xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                        
                        <div className="lg:col-span-7 space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded border border-amber-500/40 font-mono flex items-center gap-1">
                              <Sparkles size={12} /> Featured Historical Archive
                            </span>
                            <span className="text-xs text-gray-400 font-mono">• {featuredPost.readTime}</span>
                          </div>

                          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-100 leading-tight">
                            {featuredPost.title}
                          </h2>

                          <p className="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                            {featuredPost.excerpt}
                          </p>

                          <div className="flex items-center gap-4 pt-2">
                            <button
                              onClick={() => setSelectedPost(featuredPost)}
                              className="btn btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
                            >
                              Read Full Archive <ArrowUpRight size={14} />
                            </button>
                            <span className="text-xs text-amber-300/80 font-mono">
                              By {featuredPost.author.name}
                            </span>
                          </div>
                        </div>

                        <div className="lg:col-span-5 h-64 md:h-72 rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl relative group">
                          <img 
                            src={featuredPost.featuredImage} 
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                        </div>

                      </div>
                    </div>

                    {/* Top Fold Leaderboard AdSlot */}
                    <AdSlot type="leaderboard" slotId="1029384" adMode={adMode} />
                  </section>
                )}

                {/* Category Filter & Sorting Bar */}
                <section className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
                    
                    {/* Category Scroll Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          selectedCategory === 'All'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                            : 'bg-slate-900 text-gray-300 hover:text-amber-300 border border-gray-800'
                        }`}
                      >
                        All Categories ({BLOG_POSTS.length})
                      </button>

                      {CATEGORIES.map((cat) => {
                        const count = BLOG_POSTS.filter(p => p.category === cat).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                              selectedCategory === cat
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                                : 'bg-slate-900 text-gray-300 hover:text-amber-300 border border-gray-800'
                            }`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 flex items-center gap-1 font-mono">
                        <Filter size={12} className="text-amber-400" /> Sort:
                      </span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-slate-900 text-amber-300 text-xs p-1.5 rounded border border-amber-500/30 focus:outline-none"
                      >
                        <option value="latest">Latest Published</option>
                        <option value="popular">Most Readers</option>
                        <option value="readTime">Longest Read</option>
                      </select>
                    </div>

                  </div>
                </section>

                {/* Article Grid with In-Feed Ad Placements */}
                <section className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPosts.map((post, index) => (
                        <React.Fragment key={post.id}>
                          <PostCard
                            post={post}
                            onSelectPost={(p) => { setSelectedPost(p); window.scrollTo(0,0); }}
                            isBookmarked={bookmarkedIds.includes(post.id)}
                            onToggleBookmark={toggleBookmark}
                          />

                          {/* Inject Native AdSense Unit every 6 cards for high revenue */}
                          {adMode && (index + 1) % 6 === 0 && (
                            <AdSlot type="native-feed" slotId={`native-${index}`} adMode={adMode} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 space-y-3 glass-panel rounded-xl">
                      <p className="text-amber-400 font-mono text-sm">No historical archives matched your criteria.</p>
                      <button 
                        onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} 
                        className="btn btn-outline text-xs"
                      >
                        <RefreshCw size={12} /> Clear Filters & View All 52 Posts
                      </button>
                    </div>
                  )}
                </section>

              </main>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && <InteractiveTimeline />}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && <TitanicQuiz />}

            {/* Bookmarks Tab */}
            {activeTab === 'bookmarks' && (
              <main className="container py-8 space-y-6 animate-fade-in text-left">
                <div className="border-b border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                    <Bookmark size={20} className="text-amber-400" /> Saved Archives ({bookmarkedPosts.length})
                  </h2>
                  <p className="text-xs text-gray-400">Articles you've bookmarked for later offline reading.</p>
                </div>

                {bookmarkedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onSelectPost={(p) => { setSelectedPost(p); window.scrollTo(0,0); }}
                        isBookmarked={true}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 glass-panel rounded-xl text-gray-400 text-xs">
                    You haven't saved any blog posts yet. Click the bookmark icon on any article to save it here.
                  </div>
                )}
              </main>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer 
        categories={CATEGORIES}
        onSelectCategory={(cat) => { setSelectedCategory(cat); setSelectedPost(null); }}
        setActiveTab={(tab) => { setActiveTab(tab); setSelectedPost(null); }}
      />

      {/* Sticky Bottom Anchor AdSense Banner */}
      <AdSlot type="anchor-bottom" slotId="9991201" adMode={adMode} />

      {/* SEO Inspector Modal */}
      <SeoInspectorModal
        isOpen={seoModalOpen}
        onClose={() => setSeoModalOpen(false)}
        post={selectedPost || undefined}
      />
    </div>
  );
}
