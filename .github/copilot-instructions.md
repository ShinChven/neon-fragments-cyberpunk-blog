# Copilot Instructions

- When working with routing in this project, prefer importing components and hooks from `react-router` instead of `react-router-dom`.
- Specifically, use `import { Link } from 'react-router';` instead of `import { Link } from 'react-router-dom';`.
- When using `react-helmet-async` with Vite 7+, ensure it is added to `ssr.noExternal` in `vite.config.ts` to prevent "Named export not found" errors during SSR/Dev, as it is a CommonJS module.

