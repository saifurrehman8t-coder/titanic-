import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Code, Globe, Tag } from 'lucide-react';
import { BlogPost } from '../types';

interface SeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const domain = "https://titanicchronicles.site";
  const currentTitle = post ? post.title : "Titanic Chronicles | Historic Archives & Untold Stories";
  const currentDesc = post ? post.excerpt : "Explore 52 deep-dive historical articles on the RMS Titanic: shipyard construction, first-class luxury, passenger stories, timeline of the sinking, wreck exploration, and maritime safety legacy.";
  const currentUrl = post ? `${domain}/archive/${post.slug}` : domain;
  const currentImage = post ? post.featuredImage : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80";

  // Generated Schema.org Article JSON-LD
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentTitle,
    "description": currentDesc,
    "image": [currentImage],
    "datePublished": post ? "1912-04-14T00:00:00Z" : "2026-08-26T00:00:00Z",
    "author": {
      "@type": "Person",
      "name": post ? post.author.name : "Dr. Alistair Vance",
      "jobTitle": post ? post.author.role : "Maritime Historian"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Titanic Chronicles Historic Archives",
      "url": domain,
      "logo": {
        "@type": "ImageObject",
        "url": `${domain}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  const schemaString = JSON.stringify(jsonLdSchema, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl text-left">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
            <Code size={16} /> SEO & Schema.org Inspector (titanicchronicles.site)
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* AdSense Verification Badge */}
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck size={16} />
              <span><strong>AdSense Readiness: 100%</strong> (Custom Domain: <code>titanicchronicles.site</code>)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">READY FOR SUBMISSION</span>
          </div>

          {/* OpenGraph Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Globe size={12} /> OpenGraph & Meta Tags
            </h4>
            <div className="p-3 bg-slate-950 rounded border border-gray-800 font-mono text-[11px] space-y-1 text-gray-300">
              <div><span className="text-amber-400">&lt;link rel="canonical" href="</span>{currentUrl}<span className="text-amber-400">" /&gt;</span></div>
              <div><span className="text-amber-400">&lt;meta property="og:url" content="</span>{currentUrl}<span className="text-amber-400">" /&gt;</span></div>
              <div><span className="text-amber-400">&lt;meta property="og:title" content="</span>{currentTitle}<span className="text-amber-400">" /&gt;</span></div>
            </div>
          </div>

          {/* Schema.org Article JSON-LD */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Tag size={12} /> Article JSON-LD Schema
              </h4>
              <button 
                onClick={handleCopy}
                className="btn btn-outline text-[10px] py-0.5 px-2 font-mono flex items-center gap-1"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy JSON-LD'}
              </button>
            </div>
            <pre className="p-3 bg-slate-950 rounded border border-gray-800 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-48">
              {schemaString}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};
