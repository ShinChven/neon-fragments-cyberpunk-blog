import React, { useState } from 'react';
import { BlogPost } from '../types';
import PostCard from './PostCard';
import { Search } from 'lucide-react';

interface PostListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onPostGenerated: (post: BlogPost) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onSelectPost, onPostGenerated }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-gray-800 pb-4">
        <div>
          <h2 className="text-4xl font-display font-bold text-white mb-1">LATEST TRANSMISSIONS</h2>
          <p className="text-cyber-yellow font-mono text-xs">ENCRYPTED // PUBLIC KEY DETECTED</p>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-cyber-yellow group-focus-within:text-cyber-cyan transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full md:w-72 bg-black/80 border-2 border-cyber-yellow text-cyber-yellow placeholder-cyber-yellow/40 font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:text-cyber-cyan focus:placeholder-cyber-cyan/40 py-3 pl-10 pr-4 clip-corner transition-all duration-300 uppercase tracking-wider"
              placeholder="SEARCH_DATABASE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-yellow group-focus-within:bg-cyber-cyan transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-yellow group-focus-within:bg-cyber-cyan transition-colors"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={onSelectPost}
          />
        ))}
      </div>      {/* Load More Mock */}
      <div className="mt-12 text-center">
         <button className="text-gray-500 hover:text-white font-mono text-sm uppercase tracking-widest border-b border-transparent hover:border-cyber-red transition-all pb-1">
            Load Legacy Archives
         </button>
      </div>
    </div>
  );
};

export default PostList;
