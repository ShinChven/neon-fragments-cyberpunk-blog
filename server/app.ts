import { Hono } from 'hono';
import posts from '../services/posts.json';

const app = new Hono();

app.get('/api/posts', (c) => {
  return c.json(posts);
});

app.get('/api/posts/:slug', (c) => {
  const slug = c.req.param('slug');
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  return c.json(post);
});

export default app;
