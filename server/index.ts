import { Hono } from 'hono';
import { render } from '../entry-server';
import app from './app';
// @ts-ignore
import template from '../index.html?raw';
import posts from '../services/posts.json';

const server = new Hono();

server.route('/', app);

server.get('*', (c) => {
  const path = c.req.path;
  let initialPosts: typeof posts = [];

  // Simple logic to determine initial posts based on route
  // If it's a post detail page, try to find the post and include it
  const postMatch = path.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)$/);
  if (postMatch) {
    const slug = postMatch[4];
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      initialPosts = [post];
    }
  }
  // For home page or other pages, we keep initialPosts empty to avoid large payload
  // The client will fetch the list

  const { html: appHtml, helmetContext } = render(path, initialPosts);
  const { helmet } = helmetContext as any;

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

export default server;
