import { Hono } from 'hono';
import fs from 'node:fs';
import path from 'node:path';
import { generateOgImage } from './og-image';
import { BASE_URL } from '../constants';

const postsPath = path.resolve(process.cwd(), 'services', 'posts.json');
let posts: any[] = [];

try {
  const data = fs.readFileSync(postsPath, 'utf-8');
  posts = JSON.parse(data);
} catch (error) {
  console.warn('Failed to load posts from services/posts.json', error);
  posts = [];
}

const app = new Hono();

const SITE_TITLE = 'Neon Fragments: Cyberpunk Blog';
const SITE_DESCRIPTION = 'A futuristic, immersive Cyberpunk 2077-inspired blog interface.';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function getPostDescription(post: typeof posts[0]): string {
  if (post.description) return post.description;
  if (post.content) {
    const text = post.content.replace(/<[^>]*>?/gm, '');
    return text.substring(0, 200) + '...';
  }
  return '';
}

function getPostUrl(post: typeof posts[0]): string {
  const d = new Date(post.date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${BASE_URL}/${y}/${m}/${day}/${post.slug}`;
}

app.get('/rss.xml', (c) => {
  const feedPosts = posts.slice(0, 50);
  const lastBuildDate = feedPosts.length > 0 ? new Date(feedPosts[0].date).toUTCString() : new Date().toUTCString();

  const items = feedPosts.map(post => {
    const link = getPostUrl(post);
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(getPostDescription(post))}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${link}</guid>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return c.body(rss, 200, {
    'Content-Type': 'application/xml',
  });
});

app.get('/atom.xml', (c) => {
  const feedPosts = posts.slice(0, 50);
  const updated = feedPosts.length > 0 ? new Date(feedPosts[0].date).toISOString() : new Date().toISOString();

  const entries = feedPosts.map(post => {
    const link = getPostUrl(post);
    return `
    <entry>
      <title>${escapeXml(post.title)}</title>
      <link href="${link}"/>
      <id>${link}</id>
      <updated>${new Date(post.date).toISOString()}</updated>
      <summary>${escapeXml(getPostDescription(post))}</summary>
      <author>
        <name>${escapeXml(post.author.name)}</name>
      </author>
    </entry>`;
  }).join('');

  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <link href="${BASE_URL}/atom.xml" rel="self"/>
  <link href="${BASE_URL}"/>
  <updated>${updated}</updated>
  <id>${BASE_URL}/</id>
  <author>
    <name>Z. SHINCHVEN</name>
  </author>
  ${entries}
</feed>`;

  return c.body(atom, 200, {
    'Content-Type': 'application/xml',
  });
});

app.get('/card/:year/:month/:day/:slug', async (c) => {
  const { year, month, day, slug: rawSlug } = c.req.param();
  const slug = rawSlug.endsWith('.png') ? rawSlug.slice(0, -4) : rawSlug;

  // We can verify the date if needed, but slug is usually unique enough or we just find by slug
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return c.text('Post not found', 404);
  }

  try {
    const imageBuffer = await generateOgImage(post);
    return c.body(imageBuffer as unknown as ArrayBuffer, 200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    });
  } catch (e) {
    console.error(e);
    return c.text('Failed to generate image', 500);
  }
});

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
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return c.json({ error: 'Post not found' }, 404);
  }

  const post = posts[index];
  const newerPost = index > 0 ? posts[index - 1] : null;
  const olderPost = index < posts.length - 1 ? posts[index + 1] : null;

  const response = {
    ...post,
    next: newerPost ? { slug: newerPost.slug, title: newerPost.title, date: newerPost.date } : undefined,
    previous: olderPost ? { slug: olderPost.slug, title: olderPost.title, date: olderPost.date } : undefined
  };

  return c.json(response);
});

export default app;
