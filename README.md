# Neon Fragments: A Cyberpunk Blog

Neon Fragments is a **Headless SSR Blog** built with a futuristic, cyberpunk aesthetic. It leverages a modern "Polymorphic" architecture where the same code runs on the server (Hono) and the client (React), providing fast initial loads via Server-Side Rendering (SSR) and seamless navigation via Client-Side Hydration.

**[Live Preview](https://ShinChven.github.io/neon-fragments-cyberpunk-blog/)**

## 🏗 Architecture

This project separates **Program** (Code) from **Content** (Data) using a build-time compilation step.

*   **Server Framework**: [Hono](https://hono.dev/) - Handles SSR and API routes. Runs on Node.js (Dev) and Cloudflare Workers (Prod).
*   **Frontend**: React 19 + React Router v7.
*   **Build Tool**: Vite (with `@hono/vite-dev-server` for SSR).
*   **Content Engine**: Markdown files in `_posts/` are compiled to JSON at build time.

### How it Works
1.  **Content**: You write posts in Markdown (`_posts/*.md`) with YAML frontmatter.
2.  **Build**: `npm run build:content` compiles Markdown -> HTML -> `services/posts.json`.
3.  **SSR**: On the first request, Hono reads `posts.json`, renders the React app to an HTML string, and injects it into `index.html`.
4.  **Hydration**: The browser loads the HTML and the client-side React app "hydrates" the static HTML, turning it into a fully interactive SPA.
5.  **Routing**: `react-router` handles navigation. Initial load is server-rendered; subsequent clicks are client-side transitions.

## 🎨 Design System

The UI is crafted to immerse the user in a futuristic, dystopian interface.

- **Aesthetic**: High-contrast, terminal-like interface with "Netrunner" vibes.
- **Visual Effects**:
  - **Glitch Animations**: CSS-based text distortion.
  - **Scanlines**: CRT monitor overlays.
  - **HUD Elements**: Status bars and neural activity visualizations.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Server**: Hono
- **Routing**: React Router v7
- **Content**: Gray-Matter (Frontmatter), Marked (Markdown parsing)
- **Styling**: TailwindCSS, Lucide React Icons, D3.js

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/ShinChven/neon-fragments-cyberpunk-blog.git
npm install
```

### 2. Content Creation
Create a new markdown file in `_posts/`:
```yaml
---
title: "My New Post"
date: "2077-11-21"
description: "A short description for the feed."
tags: ["cyberpunk", "tech"]
---

Your content goes here...
```

Compile the content:
```bash
npm run build:content
```

### 3. Development
Start the Hono + Vite dev server:
```bash
npm run dev
```
Open `http://localhost:3000`.

### 4. Production Build
Build the client and server bundles:
```bash
npm run build
```

## 📂 Project Structure

- **`_posts/`**: Source markdown files.
- **`server/`**: Hono server entry point (`index.ts`) and API routes (`app.ts`).
- **`scripts/`**: Build scripts (e.g., `build-content.ts`).
- **`components/`**: React UI components.
- **`contexts/`**: React Contexts (e.g., `DataContext` for SSR hydration).
- **`services/`**: Data access layer (generated `posts.json`).
- **`public/`**: Static assets (`robots.txt`, images).

## ☁️ Deployment

The project is configured for **Cloudflare Workers**.
1.  Run `npm run build`.
2.  Deploy using Wrangler (configuration required in `wrangler.toml`).

---
*System Status: ONLINE // Connection Secure*
