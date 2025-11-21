import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { BlogPost } from './types';


export function render(url: string, posts: BlogPost[]) {
  const helmetContext = {};
  const html = renderToString(
    <DataProvider initialPosts={posts}>
      <ProfileProvider>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </HelmetProvider>
      </ProfileProvider>
    </DataProvider>
  );

  return { html, helmetContext };
}
