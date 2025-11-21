import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { DataProvider } from './contexts/DataContext';
import { BlogPost } from './types';

interface AppProps {
  initialPosts?: BlogPost[];
}

function App({ initialPosts = [] }: AppProps) {
  return (
    <DataProvider initialPosts={initialPosts}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
