import React from 'react';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { BlogPost } from './types';




interface AppProps {
  initialPosts?: BlogPost[];
}

function App({ initialPosts = [] }: AppProps) {
  return (
    <DataProvider initialPosts={initialPosts}>
      <HelmetProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </HelmetProvider>
    </DataProvider>
  );
}

export default App;
