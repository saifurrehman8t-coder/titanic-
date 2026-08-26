import React from 'react';
import { DollarSign, ShieldCheck, ExternalLink, Info } from 'lucide-react';

interface AdSlotProps {
  type: 'leaderboard' | 'in-article' | 'skyscraper' | 'native-feed' | 'anchor-bottom';
  slotId?: string;
  adMode?: boolean; // true = simulated visual ad, false = clean or publisher code
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, slotId = '1234567890', adMode = true }) => {
  if (!adMode) {
    return (
      <div className="adsense-unit adsense-placeholder text-center p-3 opacity-60">
        <span className="text-xs text-secondary font-mono">
          &lt;!-- Google AdSense Slot #{slotId} ({type}) --&gt;
        </span>
      </div>
    );
  }

  // Simulated visual ad units tailored for high CTR & aesthetic harmony
  const getAdContent = () => {
    switch (type) {
      case 'leaderboard':
        return (
          <div className="adsense-leaderboard w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/30">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl border border-amber-500/40">
                ⚓
              </div>
              <div>
                <span className="text-xs text-amber-400/80 uppercase font-mono tracking-wider">Sponsored Archive</span>
                <h4 className="text-sm font-semibold text-gray-100">Explore Authentic 1912 Titanic Replicas & Antiques</h4>
                <p className="text-xs text-gray-400">Certified maritime artifacts & museum-grade replica models.</p>
              </div>
            </div>
            <a 
              href="#adsense-sponsor" 
              onClick={(e) => e.preventDefault()}
              className="btn btn-primary text-xs whitespace-nowrap"
            >
              View Collection <ExternalLink size={12} />
            </a>
          </div>
        );

      case 'in-article':
        return (
          <div className="adsense-in-article p-5 my-6 rounded-xl bg-slate-900/90 border border-amber-500/30 text-left shadow-lg">
            <div className="flex items-center justify-between mb-3 border-b border-amber-500/20 pb-2">
              <span className="text-xs text-amber-400 font-mono tracking-widest uppercase flex items-center gap-1">
                <DollarSign size={12} /> AdSense Native Unit
              </span>
              <span className="text-[10px] text-gray-500">AdSlot ID: #{slotId}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="h-32 rounded-lg bg-cover bg-center border border-amber-500/20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80')` }}></div>
              <div className="md:col-span-2">
                <h4 className="text-base font-semibold text-amber-200 mb-1">Deep Sea Expeditions & Oceanographic Research Books</h4>
                <p className="text-xs text-gray-300 mb-3">Discover original expedition logs and underwater 4K footage of North Atlantic deep sea shipwrecks.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Ad by Google Partner</span>
                  <button className="btn btn-outline text-xs py-1 px-3">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skyscraper':
        return (
          <div className="adsense-skyscraper p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between text-center min-h-[500px]">
            <div className="space-y-4">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block">
                Sidebar AdSense Banner
              </span>
              <div className="w-full h-40 rounded-lg bg-cover bg-center border border-amber-500/20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80')` }}></div>
              <h4 className="text-sm font-semibold text-gray-100">National Maritime History Journal</h4>
              <p className="text-xs text-gray-400">Subscribe today for exclusive monthly historical archives and high-resolution blueprint downloads.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-2">
              <button className="btn btn-primary w-full text-xs py-2">Claim Free Trial</button>
              <span className="text-[10px] text-gray-500 block">Report this ad</span>
            </div>
          </div>
        );

      case 'native-feed':
        return (
          <div className="adsense-native-card p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 flex flex-col justify-between hover:border-amber-400 transition-all">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  SPONSORED
                </span>
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="h-40 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80')` }}></div>
              <h4 className="text-sm font-bold text-amber-100">Rare 1912 White Star Line Postcards & Collectibles</h4>
              <p className="text-xs text-gray-400 line-clamp-2">Authentic historical prints, passenger list reproductions, and vintage ocean liner memorabilia.</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Sponsored link</span>
              <span className="text-xs text-amber-400 font-medium">Explore Store &rarr;</span>
            </div>
          </div>
        );

      case 'anchor-bottom':
        return (
          <div className="adsense-anchor-bottom flex items-center justify-between container">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                AD
              </span>
              <p className="text-xs sm:text-sm text-gray-200 truncate max-w-xl">
                🚢 <strong>Titanic Heritage Foundation</strong>: Support deep-sea wreck preservation & educational grants.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-primary text-xs py-1 px-3">Donate / Learn</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`adsense-unit adsense-${type} my-4`}>
      <span className="adsense-badge">AdSense Slot #{slotId}</span>
      {getAdContent()}
    </div>
  );
};
