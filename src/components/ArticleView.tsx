import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Eye, Bookmark, Share2, Volume2, VolumeX, MessageSquare, Send, ThumbsUp, Code, Check } from 'lucide-react';
import { BlogPost, Comment } from '../types';
import { AdSlot } from './AdSlot';

interface ArticleViewProps {
  post: BlogPost;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (post: BlogPost) => void;
  adMode: boolean;
  allPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOpenSeoInspector: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  post,
  onBack,
  isBookmarked,
  onToggleBookmark,
  adMode,
  allPosts,
  onSelectPost,
  onOpenSeoInspector
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>(post.comments || []);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Track scroll progress for article reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Speech API for Text-to-Speech Audio Player
  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `${post.title}. ${post.subtitle}. ${post.content.replace(/<[^>]*>?/gm, '')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('Text-to-speech narration is not supported in this browser.');
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const commentObj: Comment = {
      id: `c-${Date.now()}`,
      author: newCommentAuthor.trim() || 'History Enthusiast',
      content: newCommentText.trim(),
      date: 'Just now',
      likes: 0
    };

    setCommentsList([commentObj, ...commentsList]);
    setNewCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Related posts from same category
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-20 animate-fade-in text-left">
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Header Leaderboard Ad */}
      <div className="container mt-4">
        <AdSlot type="leaderboard" slotId="8829102" adMode={adMode} />
      </div>

      <div className="container mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Article Column */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Archives
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold animate-pulse'
                    : 'bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800'
                }`}
              >
                {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isPlayingAudio ? 'Stop Audio' : 'Listen Article'}
              </button>

              <button
                onClick={() => onToggleBookmark(post)}
                className={`p-2 rounded-lg border transition-all ${
                  isBookmarked
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-gray-300 border-amber-500/30 hover:text-amber-400'
                }`}
                title="Bookmark article"
              >
                <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-900 text-gray-300 border border-amber-500/30 hover:text-amber-400 transition-colors"
                title="Share article link"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              </button>

              <button
                onClick={onOpenSeoInspector}
                className="p-2 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-mono"
                title="Inspect SEO Schema"
              >
                <Code size={14} />
              </button>
            </div>
          </div>

          {/* Article Header Metadata */}
          <header className="space-y-4">
            <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border border-amber-500/40">
              {post.category}
            </span>

            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-100 leading-tight">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-amber-200/80 font-serif italic">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-gray-800 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="font-semibold text-gray-200">{post.author.name}</div>
                  <div className="text-[10px] text-gray-500">{post.author.role}</div>
                </div>
              </div>

              <span className="text-gray-700">•</span>
              <span>Published {post.date}</span>

              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock size={12} className="text-amber-400" /> {post.readTime}
              </span>

              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1 font-mono">
                <Eye size={12} className="text-gray-500" /> {post.views.toLocaleString()} Readers
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <figure className="space-y-2">
            <div className="w-full h-80 md:h-[420px] rounded-xl overflow-hidden bg-slate-900 border border-amber-500/20">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            {post.imageCaption && (
              <figcaption className="text-xs text-gray-400 italic text-center">
                {post.imageCaption}
              </figcaption>
            )}
          </figure>

          {/* First In-Article Ad Slot */}
          <AdSlot type="in-article" slotId="5519203" adMode={adMode} />

          {/* Article Main Body HTML */}
          <article 
            className="prose prose-invert max-w-none space-y-6 text-gray-200 text-sm md:text-base leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Second In-Article Ad Slot */}
          <AdSlot type="in-article" slotId="7712904" adMode={adMode} />

          {/* Article Tags */}
          <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">TOPICS:</span>
            {post.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs bg-slate-900 text-amber-300/90 px-2.5 py-1 rounded border border-amber-500/20 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Comments Section */}
          <section className="pt-8 border-t border-gray-800 space-y-6">
            <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              <MessageSquare size={18} className="text-amber-400" />
              Community Discussion ({commentsList.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="glass-panel p-4 rounded-xl space-y-3">
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full bg-slate-900 text-xs text-gray-200 p-2.5 rounded border border-amber-500/30"
              />
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts on this historic archive..."
                rows={3}
                className="w-full bg-slate-900 text-xs text-gray-200 p-2.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-400"
              ></textarea>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary text-xs py-2 px-4">
                  <Send size={12} /> Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {commentsList.map((comm) => (
                <div key={comm.id} className="p-4 rounded-lg bg-slate-900/60 border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-300">{comm.author}</span>
                    <span className="text-[10px] text-gray-500">{comm.date}</span>
                  </div>
                  <p className="text-xs text-gray-300">{comm.content}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* Sticky Sidebar Column */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Author Box */}
          <div className="glass-panel p-5 rounded-xl space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2">
              About the Author
            </h4>
            <div className="flex items-center gap-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
              />
              <div>
                <h5 className="text-sm font-bold text-gray-100">{post.author.name}</h5>
                <p className="text-xs text-amber-300/80">{post.author.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Specialist contributor to the Titanic Chronicles archive dedicated to preservation of maritime primary records.
            </p>
          </div>

          {/* Sticky Sidebar AdSense Skyscraper Banner */}
          <div className="sticky top-24">
            <AdSlot type="skyscraper" slotId="9918231" adMode={adMode} />

            {/* Related Articles Box */}
            {relatedPosts.length > 0 && (
              <div className="glass-panel p-5 rounded-xl mt-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2">
                  Related Archives
                </h4>
                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <div 
                      key={rel.id} 
                      onClick={() => onSelectPost(rel)}
                      className="cursor-pointer group flex items-center gap-3 hover:bg-amber-500/10 p-2 rounded transition-colors"
                    >
                      <img 
                        src={rel.featuredImage} 
                        alt={rel.title}
                        className="w-12 h-12 rounded object-cover border border-gray-700"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-gray-200 group-hover:text-amber-300 line-clamp-2">
                          {rel.title}
                        </h5>
                        <span className="text-[10px] text-gray-500 font-mono">{rel.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
};
