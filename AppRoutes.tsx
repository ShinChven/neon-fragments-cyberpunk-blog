import React from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import GlitchText from './components/GlitchText';
import NetPage from './components/NetPage';

const GenericPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-display font-bold text-white mb-4">
      <GlitchText text={title} />
    </h1>
    <div className="p-4 border border-cyber-yellow/30 bg-cyber-yellow/5 inline-block">
      <p className="text-cyber-yellow font-mono">SYSTEM MESSAGE: SECTOR UNDER CONSTRUCTION</p>
    </div>
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="net" element={<NetPage />} />
        <Route path="data" element={<GenericPage title="DATA ARCHIVES" />} />
        <Route path="gear" element={<GenericPage title="CYBERWARE" />} />
        <Route path=":year/:month/:day/:slug" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
