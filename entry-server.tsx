import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import * as HelmetAsyncPkg from 'react-helmet-async';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { BlogPost } from './types';

const { HelmetProvider } = (HelmetAsyncPkg as any).default || HelmetAsyncPkg;


export function render(url: string, posts: BlogPost[]) {
  const helmetContext = {};
  const html = renderToString(
    <DataProvider initialPosts={posts}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </DataProvider>
  );

  return { html, helmetContext };
}
