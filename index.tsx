import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BlogPost } from './types';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// @ts-ignore
const initialPosts = window.__INITIAL_DATA__ as BlogPost[] || [];

ReactDOM.hydrateRoot(rootElement,
  <React.StrictMode>
    <App initialPosts={initialPosts} />
  </React.StrictMode>
);
