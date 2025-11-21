import React from 'react';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { BlogPost } from './types';




interface AppProps {
  initialPosts?: BlogPost[];
}

function App({ initialPosts = [] }: AppProps) {
  return (
    <DataProvider initialPosts={initialPosts}>
      <ProfileProvider>
        <HelmetProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </HelmetProvider>
      </ProfileProvider>
    </DataProvider>
  );
}

export default App;
