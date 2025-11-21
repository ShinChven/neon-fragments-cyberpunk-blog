# Neon Fragments: A Cyberpunk Blog

Neon Fragments is a web application that simulates a cyberpunk-themed blog. It's built with React, TypeScript, and Vite, and it uses the Gemini API to generate blog post content. The user interface is designed to be immersive and visually appealing, with a futuristic, cyberpunk aesthetic.

## Features

- **Cyberpunk UI:** The application features a dark, neon-lit user interface with a cyberpunk aesthetic.
- **Post Generation:** New blog posts are generated using a mock service (previously Gemini API).
- **Component-Based Architecture:** The application is built with a modular, component-based architecture using React.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.

## Design System

The UI is crafted to immerse the user in a futuristic, dystopian interface typical of the Cyberpunk genre.

- **Aesthetic:** High-contrast, terminal-like interface with "Netrunner" vibes.
- **Color Palette:**
  - **Backgrounds:** Deep Black (`#000000`) and Dark Grey (`#111111`) for high contrast.
  - **Primary Accent:** Neon Yellow (`#FCEE0A`) used for primary actions and highlights.
  - **Secondary Accent:** Cyan (`#00F0FF`) for data streams and neural links.
  - **Alerts:** Neon Red (`#FF003C`) for warnings, errors, and "ICE" levels.
- **Typography:** Monospace fonts are used extensively to mimic code editors and command-line interfaces.
- **Visual Effects:**
  - **Glitch Animations:** Text and borders occasionally distort to simulate digital interference.
  - **HUD Elements:** Status bars (RAM, ICE, UPLINK) and neural activity visualizations (D3.js waves).
  - **Scanlines:** Subtle overlays to replicate the look of CRT monitors or retinal displays.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** A fast build tool and development server for modern web projects.
- **D3:** Used for data visualization in the profile sidebar.
- **Lucide React:** A library of simply designed icons.

## Components

- **`App.tsx`:** The main application component that manages the application's state and renders the different views.
- **`CyberButton.tsx`:** A reusable button component with a cyberpunk-themed design.
- **`GlitchText.tsx`:** A component that applies a glitch effect to text.
- **`Navbar.tsx`:** The navigation bar component.
- **`PostCard.tsx`:** A component that displays a summary of a blog post.
- **`PostDetail.tsx`:** A component that displays the full content of a blog post.
- **`PostList.tsx`:** A component that displays a list of blog posts.
- **`ProfileSidebar.tsx`:** A sidebar component that displays user profile information.

## Services

- **`postService.ts`:** A service that generates mock blog posts.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/neon-fragments_-cyberpunk-blog.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
This will start the development server and open the application in your browser at `http://localhost:5173`.

## Available Scripts

- **`npm run dev`:** Runs the application in development mode.
- **`npm run build`:** Builds the application for production.
- **`npm run preview`:** Serves the production build locally for preview.
