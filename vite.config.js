import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercepts calls to /api/claude and forwards them to the Anthropic API.
      // This avoids the CORS error you'd get calling api.anthropic.com directly from the browser.
      // Only active during local development (npm run dev) — has no effect on production builds.
      '/api/claude': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/claude/, '/v1/messages'),
      },
    },
  },
});
