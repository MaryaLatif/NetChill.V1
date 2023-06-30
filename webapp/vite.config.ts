import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'build',
  },
  server: {
    port:3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
