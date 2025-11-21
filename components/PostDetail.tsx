import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, AlertOctagon } from 'lucide-react';
import CyberButton from './CyberButton';
import GlitchText from './GlitchText';
import NotFound from './NotFound';
import CyberDate from './CyberDate';




const PostDetail: React.FC = () => {
  const { year, month, day, slug } = useParams<{ year: string; month: string; day: string; slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts } = useData();

  // Initialize directly from context for SSR support
  const foundPost = posts.find(p => p.slug === slug);
  const [post, setPost] = useState<BlogPost | null>(foundPost || null);
  const [loading, setLoading] = useState(!foundPost);

  useEffect(() => {
    if (!post && slug) {
       // Fallback if not found in initial context (e.g. direct navigation to a new post not in initial payload?)
       // For now, we rely on context. In a real app, we might fetch individual post here.
       const found = posts.find(p => p.slug === slug);
       if (found) {
         setPost(found);
         setLoading(false);
       } else {
         fetch(`/api/posts/${slug}`)
           .then(res => {
             if (res.ok) return res.json();
             throw new Error('Post not found');
           })
           .then(data => {
             setPost(data);
             setLoading(false);
           })
           .catch(err => {
             console.error(err);
             setLoading(false);
           });
       }
    }
  }, [slug, posts, post]);

  if (loading) {
    return <div className="text-white text-center mt-20">DECRYPTING DATA STREAM...</div>;
  }

  if (!post) {
    return <NotFound />;
  }

  const baseUrl = 'https://neon-fragments.com';
  const currentUrl = `${baseUrl}${location.pathname}`;
  const defaultImage = "https://picsum.photos/1200/400";
  const displayImage = post.image || defaultImage;

  let ogImage = defaultImage;
  if (post.image) {
    if (post.image.startsWith('http')) {
      ogImage = post.image;
    } else {
      const cleanPath = post.image.startsWith('/') ? post.image : `/${post.image}`;
      ogImage = `${baseUrl}${cleanPath}`;
    }
  }
  const plainTextContent = post.content.replace(/<[^>]+>/g, '');
  const description = post.description || plainTextContent.substring(0, 150) + '...';

  return (
    <div className="bg-cyber-dark min-h-full relative border-t-4 border-cyber-yellow">
      <Helmet>
        <title>{post.title} | NEON FRAGMENTS</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="NEON FRAGMENTS" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* Header Image / Banner Area */}
      <div className="h-32 md:h-48 w-full bg-zinc-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: `url('${displayImage}')` }}></div>
         <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>

         <div className="absolute bottom-4 left-4 md:left-8">
           <button onClick={() => navigate('/')} className="flex items-center text-cyber-cyan hover:text-white transition-colors font-mono text-sm mb-2 md:mb-4">
             <ArrowLeft className="w-4 h-4 mr-2" /> RETURN_TO_GRID
           </button>
           <h1 className="text-2xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(252,238,10,0.5)]">
             <GlitchText text={post.title} />
           </h1>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Metadata Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4 mb-8 font-mono text-sm text-gray-400 gap-2 md:gap-0">
          <div className="flex items-center space-x-4">
             <CyberDate date={post.date} className="text-base" />
             <span className="flex items-center"><span className="w-2 h-2 bg-cyber-red rounded-full mr-2 animate-pulse"></span> {post.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
             <span>AUTHOR:</span>
             <span className="text-white border border-gray-600 px-2 bg-gray-800 uppercase">{post.author}</span>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div
            className="text-gray-300 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
            <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`} className="text-xs font-bold font-mono bg-cyber-cyan/10 text-cyber-cyan px-3 py-1 border border-cyber-cyan/30 uppercase hover:bg-cyber-cyan/20 transition-colors">
              #{tag}
            </Link>
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
};export default PostDetail;
