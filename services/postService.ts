import { BlogPost } from "../types";

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
};

// Keep for backward compatibility if needed, but warn
export const generateCyberpunkPost = async (): Promise<BlogPost> => {
  console.warn("generateCyberpunkPost is deprecated. Use getAllPosts instead.");
  const posts = await getAllPosts();
  return posts[0];
};
