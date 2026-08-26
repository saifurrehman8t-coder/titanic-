import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/timeline';
import { Clock, MapPin, Calendar, Compass } from 'lucide-react';

export const InteractiveTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Planning', 'Construction', 'Milestone', 'Testing', 'Voyage', 'Disaster', 'Rescue', 'Discovery'];

  const filteredEvents = selectedCategory === 'All'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter(e => e.category === selectedCategory);

  return (
    <div className="container py-8 space-y-8 animate-fade-in text-left">
      {/* Timeline Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border border-amber-500/40 font-mono">
          Chronological Archive
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold gold-gradient-text">
          Interactive Titanic Historical Timeline
        </h2>
        <p className="text-xs md:text-sm text-gray-400">
          Trace key milestones from the 1907 London dinner concept to the 1985 deep-sea discovery by Dr. Robert Ballard.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-gray-400 hover:text-amber-300 border border-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-amber-500/30 ml-4 md:ml-32 space-y-8 pl-6 md:pl-8">
        {filteredEvents.map((evt, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:bg-amber-400 group-hover:scale-125 transition-all shadow-lg"></div>

            {/* Left Year Label on Desktop */}
            <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
              <span className="text-sm font-bold text-amber-400 font-mono block">{evt.year}</span>
              <span className="text-[10px] text-gray-500 block">{evt.category}</span>
            </div>

            {/* Event Card */}
            <div className="glass-panel p-5 rounded-xl space-y-2 hover:border-amber-400/50 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1 font-mono">
                  <Calendar size={12} /> {evt.date}
                </span>
                {evt.location && (
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <MapPin size={12} className="text-amber-500" /> {evt.location}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-gray-100">{evt.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{evt.description}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
