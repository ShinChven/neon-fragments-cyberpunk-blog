import React, { createContext, useContext } from 'react';
import { BlogPost } from '../types';

interface DataContextType {
  posts: BlogPost[];
}

const DataContext = createContext<DataContextType>({ posts: [] });

export const DataProvider: React.FC<{ children: React.ReactNode; initialPosts: BlogPost[] }> = ({ children, initialPosts }) => {
  return (
    <DataContext.Provider value={{ posts: initialPosts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
