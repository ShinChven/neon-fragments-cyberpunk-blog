import { BlogPost } from "../types";

const MOCK_POSTS = [
  {
    title: "NEON RAIN OVER WATSON",
    content: "The acid rain hasn't stopped for three days. My optics are glitching from the humidity. Saw a corpo transport get flatlined by a gang of Maelstrom gonks near the docks. Night City never sleeps, it just reboots.",
    tags: ["WATSON", "RAIN", "MAELSTROM"],
    readTime: "2 min"
  },
  {
    title: "NETRUNNER'S LAMENT",
    content: "Jacked into the subnet last night. The ICE is getting thicker. Arasaka's new daemons are nasty pieces of code. Lost a good choom to a brain-fry. Stay safe out there in the deep dive.",
    tags: ["NETRUNNING", "ICE", "ARASAKA"],
    readTime: "3 min"
  },
  {
    title: "STREET FOOD ROULETTE",
    content: "Tried that new synth-meat stand in Japantown. Tasted like recycled plastic and despair. Best 5 eddies I ever spent. My gut feels like it's processing a malware upload though.",
    tags: ["FOOD", "JAPANTOWN", "REGRET"],
    readTime: "1 min"
  },
  {
    title: "CHROME UPGRADE",
    content: "Finally got enough scratch for that Kiroshi optical upgrade. The resolution is preem. I can see the fear in people's eyes in 8K now. Worth every enny.",
    tags: ["CYBERWARE", "UPGRADE", "KIROSHI"],
    readTime: "2 min"
  }
];

export const generateCyberpunkPost = async (): Promise<BlogPost> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const randomPost = MOCK_POSTS[Math.floor(Math.random() * MOCK_POSTS.length)];

  return {
    id: crypto.randomUUID(),
    title: randomPost.title,
    content: randomPost.content,
    tags: randomPost.tags,
    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    author: "AI_CONSTRUCT",
    readTime: randomPost.readTime,
    likes: 0,
    isGlitch: true
  };
};
