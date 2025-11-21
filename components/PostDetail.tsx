import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, AlertOctagon } from 'lucide-react';
import CyberButton from './CyberButton';
import GlitchText from './GlitchText';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="bg-cyber-dark min-h-full relative border-t-4 border-cyber-yellow">
      {/* Header Image / Banner Area */}
      <div className="h-48 w-full bg-zinc-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/400')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
         
         <div className="absolute bottom-4 left-4 md:left-8">
           <button onClick={onBack} className="flex items-center text-cyber-cyan hover:text-white transition-colors font-mono text-sm mb-4">
             <ArrowLeft className="w-4 h-4 mr-2" /> RETURN_TO_GRID
           </button>
           <h1 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(252,238,10,0.5)]">
             <GlitchText text={post.title} />
           </h1>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-800 pb-4 mb-8 font-mono text-sm text-gray-400">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
             <span className="text-cyber-yellow">{post.date}</span>
             <span className="flex items-center"><span className="w-2 h-2 bg-cyber-red rounded-full mr-2 animate-pulse"></span> {post.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
             <span>AUTHOR:</span>
             <span className="text-white border border-gray-600 px-2 bg-gray-800">{post.author}</span>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="text-gray-300 leading-relaxed font-sans whitespace-pre-line">
            {post.content}
          </div>
          
          {post.isGlitch && (
            <div className="mt-8 p-4 border border-cyber-red/50 bg-cyber-red/5 flex items-start space-x-3">
               <AlertOctagon className="w-6 h-6 text-cyber-red flex-shrink-0" />
               <p className="text-cyber-red text-sm font-mono m-0">
                 WARNING: This content has been flagged by NetWatch. Viewing may void your neural interface warranty.
               </p>
            </div>
          )}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold font-mono bg-cyber-cyan/10 text-cyber-cyan px-3 py-1 border border-cyber-cyan/30 uppercase">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900 p-6 clip-corner border-l-4 border-cyber-cyan">
           <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-cyber-yellow transition-colors group">
                <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold">{post.likes} KUDOS</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-cyber-cyan transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="font-mono font-bold">COMMENT</span>
              </button>
           </div>

           <div className="flex items-center space-x-4">
              <span className="text-gray-500 font-mono text-xs uppercase">Share Node:</span>
              <CyberButton variant="secondary" className="py-2 px-4">
                <Share2 className="w-4 h-4" />
              </CyberButton>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
