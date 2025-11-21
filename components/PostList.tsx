import React, { useState } from 'react';
import { BlogPost } from '../types';
import PostCard from './PostCard';
import CyberButton from './CyberButton';
import { Sparkles } from 'lucide-react';
import { generateCyberpunkPost } from '../services/geminiService';

interface PostListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onPostGenerated: (post: BlogPost) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onSelectPost, onPostGenerated }) => {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const newPost = await generateCyberpunkPost();
      onPostGenerated(newPost);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-gray-800 pb-4">
        <div>
          <h2 className="text-4xl font-display font-bold text-white mb-1">LATEST TRANSMISSIONS</h2>
          <p className="text-cyber-yellow font-mono text-xs">ENCRYPTED // PUBLIC KEY DETECTED</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <CyberButton onClick={handleGenerate} loading={generating} variant="primary">
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              GENERATE SIGNAL
            </span>
          </CyberButton>
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
      </div>

      {/* Load More Mock */}
      <div className="mt-12 text-center">
         <button className="text-gray-500 hover:text-white font-mono text-sm uppercase tracking-widest border-b border-transparent hover:border-cyber-red transition-all pb-1">
            Load Legacy Archives
         </button>
      </div>
    </div>
  );
};

export default PostList;
