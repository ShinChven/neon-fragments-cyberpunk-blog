import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { BlogPost } from '../types';
import { useData } from '../contexts/DataContext';
import { useProfile } from '../contexts/ProfileContext';
import PostCard from './PostCard';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PostListProps {
  posts?: BlogPost[];
}

const PostList: React.FC<PostListProps> = ({ posts: propPosts }) => {
  const { posts: contextPosts } = useData();
  const { resetProfile } = useProfile();
  const [posts, setPosts] = useState<BlogPost[]>(propPosts || contextPosts || []);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const tagQuery = searchParams.get('tags') || searchParams.get('tag') || '';
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    resetProfile();
  }, [resetProfile]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', '10');
        if (searchQuery) {
          params.set('search', searchQuery);
        }
        if (tagQuery) {
          params.set('tags', tagQuery);
        }

        const response = await fetch(`/api/posts?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, searchQuery, tagQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (inputValue) {
          newParams.set('search', inputValue);
        } else {
          newParams.delete('search');
        }
        newParams.set('page', '1'); // Reset to page 1 on search
        return newParams;
      });
    }
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('search');
      return newParams;
    });
  };

  const handleClearTag = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('tags');
      newParams.delete('tag');
      newParams.set('page', '1');
      return newParams;
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', String(newPage));
        return newParams;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-0 sm:px-6 lg:px-8 py-2 md:py-0">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b-2 border-gray-800 pb-4 px-4 sm:px-0">
        <div>
          <h2 className="text-4xl font-display font-bold text-white mb-1">LATEST TRANSMISSIONS</h2>
          <p className="text-cyber-yellow font-mono text-xs">ENCRYPTED // PUBLIC KEY DETECTED</p>
          {tagQuery && (
            <div className="mt-2 flex items-center space-x-2 bg-cyber-yellow/10 px-2 py-1 rounded border border-cyber-yellow/30 inline-flex">
              <span className="text-cyber-yellow font-mono text-xs">FILTER: TAG [{tagQuery}]</span>
              <button onClick={handleClearTag} className="text-cyber-yellow hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-cyber-yellow group-focus-within:text-cyber-cyan transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full md:w-72 bg-black/80 border-2 border-cyber-yellow text-cyber-yellow placeholder-cyber-yellow/40 font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:text-cyber-cyan focus:placeholder-cyber-cyan/40 py-3 pl-10 pr-10 clip-corner transition-all duration-300 uppercase tracking-wider"
              placeholder="SEARCH_DATABASE..."
              value={inputValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {inputValue && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyber-yellow hover:text-cyber-cyan transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-yellow group-focus-within:bg-cyber-cyan transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-yellow group-focus-within:bg-cyber-cyan transition-colors"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {loading && posts.length === 0 ? (
          <div className="text-center text-cyber-yellow font-mono animate-pulse">
            INITIALIZING DATA LINK...
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-12 flex justify-center items-center space-x-6">
         <button
           onClick={() => handlePageChange(page - 1)}
           disabled={page <= 1}
           className={`flex items-center space-x-2 font-mono text-sm uppercase tracking-widest border border-transparent px-4 py-2 transition-all ${page <= 1 ? 'text-gray-600 cursor-not-allowed' : 'text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10'}`}
         >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV_SECTOR</span>
         </button>

         <div className="font-mono text-cyber-yellow text-sm">
            PAGE <span className="text-white font-bold">{page}</span> / {totalPages}
         </div>

         <button
           onClick={() => handlePageChange(page + 1)}
           disabled={page >= totalPages}
           className={`flex items-center space-x-2 font-mono text-sm uppercase tracking-widest border border-transparent px-4 py-2 transition-all ${page >= totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10'}`}
         >
            <span>NEXT_SECTOR</span>
            <ChevronRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};

export default PostList;
