import React, { useState } from 'react';
import { Mail, Check, Shield, DollarSign, Anchor } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (category: Category | 'All') => void;
  setActiveTab: (tab: 'blogs' | 'timeline' | 'quiz' | 'bookmarks') => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, onSelectCategory, setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-left pt-12 pb-8 mt-16 text-xs text-gray-400">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
              ⚓
            </div>
            <h3 className="text-base font-bold gold-gradient-text tracking-wider">
              TITANIC CHRONICLES
            </h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            The world's most comprehensive digital archive of RMS Titanic history, passenger records, shipyard construction, and deep-sea exploration.
          </p>
          <div className="text-[11px] text-amber-400/80 font-mono">
            Published for History Enthusiasts Worldwide
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 border-b border-gray-800 pb-2">
            Archive Categories
          </h4>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => { onSelectCategory(cat); setActiveTab('blogs'); window.scrollTo(0,0); }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 border-b border-gray-800 pb-2">
            Interactive Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => { setActiveTab('timeline'); window.scrollTo(0,0); }} className="hover:text-amber-300 transition-colors">
                • 1912 Interactive Timeline
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('quiz'); window.scrollTo(0,0); }} className="hover:text-amber-300 transition-colors">
                • Titanic Trivia Quiz Challenge
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('bookmarks'); window.scrollTo(0,0); }} className="hover:text-amber-300 transition-colors">
                • Saved Bookmarks & Favorites
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 border-b border-gray-800 pb-2">
            Historical Gazette Dispatch
          </h4>
          <p className="text-xs text-gray-400">
            Subscribe for monthly primary source releases, restored photographs, and architectural blueprint deep-dives.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="w-full bg-slate-900 text-gray-200 text-xs p-2.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-400"
              />
              <button type="submit" className="btn btn-primary w-full text-xs py-2">
                <Mail size={12} /> Subscribe Free
              </button>
            </form>
          ) : (
            <div className="p-3 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check size={16} /> Subscribed to Titanic Gazette!
            </div>
          )}
        </div>

      </div>

      {/* AdSense Publisher Disclaimer & Copyright */}
      <div className="container pt-6 border-t border-gray-900 text-[11px] text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 1912–2026 Titanic Chronicles Historical Archives. All rights reserved.</p>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-1"><DollarSign size={10} className="text-amber-400" /> AdSense Compliant Layout</span>
          <span className="flex items-center gap-1"><Shield size={10} className="text-emerald-400" /> GDPR & CCPA Privacy Ready</span>
        </div>
      </div>
    </footer>
  );
};
