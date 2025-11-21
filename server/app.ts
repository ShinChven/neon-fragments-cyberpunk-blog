import { Hono } from 'hono';
import posts from '../services/posts.json';

const app = new Hono();

app.get('/api/tags', (c) => {
  const tagCounts: Record<string, number> = {};
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  return c.json(tags);
});

app.get('/api/posts', (c) => {
  const page = Number(c.req.query('page')) || 1;
  const limit = Number(c.req.query('limit')) || 10;
  const search = c.req.query('search') || '';
  const tag = c.req.query('tags') || '';
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let filteredPosts = posts;

  if (tag) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(lowerSearch) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
    );
  }

  const summaries = filteredPosts.map((post) => {
    const { content, ...rest } = post;
    let description = rest.description;
    if (!description && content) {
      const text = content.replace(/<[^>]*>?/gm, '');
      description = text.substring(0, 200) + '...';
    }
    return { ...rest, description };
  });

  const paginatedPosts = summaries.slice(startIndex, endIndex);

  return c.json({
    posts: paginatedPosts,
    total: summaries.length,
    page,
    limit,
    totalPages: Math.ceil(summaries.length / limit)
  });
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
