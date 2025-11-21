import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        devServer({
          entry: 'server/index.ts',
          exclude: [
            /.*\.tsx?($|\?)/,
            /.*\.ts?($|\?)/,
            /.*\.css($|\?)/,
            /.*\.png($|\?)/,
            /.*\.jpg($|\?)/,
            /.*\.jpeg($|\?)/,
            /.*\.gif($|\?)/,
            /.*\.svg($|\?)/,
            /^\/@.+$/,
            /^\/node_modules\/.*/,
          ]
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      ssr: {
        noExternal: ['react-helmet-async']
      }
    };
});
