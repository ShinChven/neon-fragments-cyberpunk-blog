import React from 'react';
import { Link } from 'react-router';
import { BlogPost } from '../types';
import { Clock, Hash, ChevronRight, AlertTriangle } from 'lucide-react';
import CyberDate from './CyberDate';

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Parse date for permalink: 2077-08-12 04:20
  const dateObj = new Date(post.date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const permalink = `/${year}/${month}/${day}/${post.slug}`;

  return (
    <Link
      to={permalink}
      className="block group relative bg-cyber-dark border-l-4 border-cyber-gray hover:border-cyber-yellow transition-all duration-300 p-6 cursor-pointer mb-4 overflow-hidden hover:bg-gray-900"
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-yellow/0 to-cyber-yellow/0 group-hover:from-cyber-yellow/5 group-hover:to-transparent transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
            <Clock className="w-3 h-3" />
            <CyberDate date={post.date} />
            <span className="text-cyber-cyan uppercase"> // {post.author}</span>
          </div>
          {post.isGlitch && <AlertTriangle className="w-4 h-4 text-cyber-red animate-pulse" />}
        </div>

        <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-cyber-yellow mb-3 transition-colors uppercase tracking-tight">
           {post.title}
        </h3>

        <p className="text-gray-400 line-clamp-2 font-sans mb-4 text-sm">
          {post.description || post.content.replace(/<[^>]*>?/gm, '')}
        </p>

        <div className="flex justify-between items-end">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center text-[10px] font-mono bg-gray-800 text-cyber-cyan px-2 py-1 border border-gray-700">
                <Hash className="w-2 h-2 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <span className="text-cyber-yellow opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 flex items-center text-sm font-bold uppercase font-mono">
            Read <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
