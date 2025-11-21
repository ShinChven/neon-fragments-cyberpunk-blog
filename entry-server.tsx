import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { BlogPost } from './types';

export function render(url: string, posts: BlogPost[]) {
  return renderToString(
    <DataProvider initialPosts={posts}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </DataProvider>
  );
}
