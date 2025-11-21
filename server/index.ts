import { Hono } from 'hono';
import { render } from '../entry-server';
import app from './app';
// @ts-ignore
import template from '../index.html?raw';
import posts from '../services/posts.json';

const server = new Hono();

server.route('/', app);

server.get('*', (c) => {
  const appHtml = render(c.req.path, posts);
  let html = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--initial-data-->', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(posts)}</script>`);

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
