import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import fg from 'fast-glob';

const CONTENT_DIR = process.env.CONTENT_DIR || '_posts';
const OUTPUT_FILE = path.join(process.cwd(), 'services', 'posts.json');

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content
  description?: string;
  excerpt?: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  likes: number;
  isGlitch?: boolean;
}

async function buildContent() {
  console.log(`Scanning for markdown files in ${CONTENT_DIR}...`);

  // Check if content dir exists
  try {
    await fs.access(CONTENT_DIR);
  } catch {
    console.warn(`Content directory ${CONTENT_DIR} not found. Creating empty posts.json.`);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const files = await fg(`${CONTENT_DIR}/**/*.md`);
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    const { data, content } = matter(raw);

    // Generate slug from filename if not provided
    const filename = path.basename(file, '.md');
    const slug = data.slug || filename;

    // Calculate read time (rough estimate)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) + ' min';

    const htmlContent = await marked(content);

    posts.push({
      id: data.id || crypto.randomUUID(),
      title: data.title || 'Untitled',
      slug: slug,
      content: htmlContent,
      description: data.description,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      author: data.author || 'z.shinchven',
      tags: data.tags || [],
      readTime: data.readTime || readTime,
      likes: data.likes || 0,
      isGlitch: data.isGlitch || false
    });
  }

  // Sort by date desc
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Generated ${posts.length} posts to ${OUTPUT_FILE}`);
}

buildContent().catch(console.error);
