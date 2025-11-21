import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfileSidebar from './components/ProfileSidebar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { BlogPost, NavItem, ViewState } from './types';
import { INITIAL_POSTS, MOCK_USER } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LIST);
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.HOME);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Simple effect to scroll top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedPost]);

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    setView(ViewState.DETAIL);
  };

  const handleBack = () => {
    setSelectedPost(null);
    setView(ViewState.LIST);
  };

  const handleNewPost = (post: BlogPost) => {
    setPosts([post, ...posts]);
  };

  const handleNav = (item: NavItem) => {
    setActiveNav(item);
    if (item === NavItem.HOME) {
       setView(ViewState.LIST);
       setSelectedPost(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 selection:bg-cyber-yellow selection:text-black">
      <Navbar activeItem={activeNav} onNavigate={handleNav} />

      <main className="flex-grow container mx-auto max-w-7xl w-full md:px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar - Sticky on Desktop */}
          <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 h-fit">
             <ProfileSidebar user={MOCK_USER} />
             
             {/* Decorative Sidebar Elements */}
             <div className="mt-6 hidden lg:block">
                <div className="border border-gray-800 p-4 bg-black/40">
                   <h4 className="text-cyber-red font-mono text-xs font-bold mb-2">SYSTEM STATUS</h4>
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                         <span>FIREWALL</span>
                         <span className="text-green-500">ACTIVE</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                         <span>TRACE_ROUTE</span>
                         <span className="text-red-500">BLOCKED</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1 mt-2">
                         <div className="bg-cyber-yellow h-full w-2/3 animate-pulse"></div>
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-grow min-w-0">
             {view === ViewState.LIST ? (
               <PostList 
                  posts={posts} 
                  onSelectPost={handlePostSelect} 
                  onPostGenerated={handleNewPost}
               />
             ) : (
               selectedPost && (
                 <PostDetail 
                    post={selectedPost} 
                    onBack={handleBack} 
                 />
               )
             )}
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-gray-600 font-mono text-xs">
             © 2077 NEON FRAGMENTS // NO RIGHTS RESERVED // POWERED BY GEMINI
           </p>
           <div className="mt-2 text-[10px] text-gray-700 uppercase tracking-[0.2em]">
             Netwatch Protocol v.2.55 // Secure Connection
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
