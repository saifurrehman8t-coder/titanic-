import React from 'react';
import { Clock, Eye, Bookmark, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
  isBookmarked: boolean;
  onToggleBookmark: (post: BlogPost, e: React.MouseEvent) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onSelectPost,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <article 
      onClick={() => onSelectPost(post)}
      className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-amber-400/60 transition-all hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* Card Header Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md backdrop-blur-sm">
            {post.category}
          </span>

          {/* Bookmark Quick Action */}
          <button
            onClick={(e) => onToggleBookmark(post, e)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isBookmarked 
                ? 'bg-amber-500 text-slate-950 shadow-lg scale-110' 
                : 'bg-slate-950/60 text-gray-300 hover:text-amber-400'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 text-left space-y-3">
          <h3 className="text-base md:text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer Metadata */}
      <div className="px-5 pb-5 pt-3 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-5 h-5 rounded-full object-cover border border-amber-500/30"
          />
          <span className="truncate max-w-[100px] font-medium text-gray-300">{post.author.name}</span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-amber-400" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} className="text-gray-500" /> {(post.views / 1000).toFixed(1)}k
          </span>
        </div>
      </div>
    </article>
  );
};
