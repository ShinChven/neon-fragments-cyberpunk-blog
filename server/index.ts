/// <reference types="vite/client" />
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import fs from 'node:fs';
import path from 'node:path';
import { render } from '../entry-server';
import app from './app';
// @ts-ignore
// import template from '../index.html?raw';
// import posts from '../services/posts.json';

const postsPath = path.resolve(process.cwd(), 'services', 'posts.json');
let posts: any[] = [];

try {
  const data = fs.readFileSync(postsPath, 'utf-8');
  posts = JSON.parse(data);
} catch (error) {
  console.warn('Failed to load posts from services/posts.json', error);
  posts = [];
}

const server = new Hono();

if (import.meta.env.PROD) {
  server.use('/*', serveStatic({ root: './dist/client' }));
}

server.route('/', app);

server.get('*', (c) => {
  const pathName = c.req.path;
  let initialPosts: typeof posts = [];

  // Simple logic to determine initial posts based on route
  // If it's a post detail page, try to find the post and include it
  const postMatch = pathName.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)$/);
  if (postMatch) {
    const slug = postMatch[4];
    const index = posts.findIndex((p) => p.slug === slug);
    if (index !== -1) {
      const post = posts[index];
      const newerPost = index > 0 ? posts[index - 1] : null;
      const olderPost = index < posts.length - 1 ? posts[index + 1] : null;

      const postWithNav = {
        ...post,
        next: newerPost ? { slug: newerPost.slug, title: newerPost.title, date: newerPost.date } : undefined,
        previous: olderPost ? { slug: olderPost.slug, title: olderPost.title, date: olderPost.date } : undefined
      };

      initialPosts = [postWithNav];
    }
  }
  // For home page or other pages, we keep initialPosts empty to avoid large payload
  // The client will fetch the list

  const { html: appHtml, helmetContext } = render(pathName, initialPosts);
  const { helmet } = helmetContext as any;

  let template = '';
  if (import.meta.env.PROD) {
    try {
      template = fs.readFileSync(path.resolve('dist/client/index.html.template'), 'utf-8');
    } catch (e) {
      console.error("Could not read dist/client/index.html.template");
      return c.text("Internal Server Error: Missing client build", 500);
    }
  } else {
    try {
      template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    } catch (e) {
      console.error("Could not read index.html");
      return c.text("Internal Server Error: Missing index.html", 500);
    }
  }

  let html = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--initial-data-->', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialPosts)}</script>`);

  if (helmet) {
    const helmetHead = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `;
    html = html.replace('</head>', `${helmetHead}</head>`);
  }

  // @ts-ignore
  if (import.meta.env.DEV) {
    html = html.replace(
      '<head>',
      `<head>
    <script type="module">
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>`
    );
  }

  return c.html(html);
});

if (import.meta.env.PROD) {
  const port = 3000;
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: server.fetch,
    port
  });
}

export default server;
