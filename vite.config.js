import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const alias = {
  'common': path.resolve(__dirname, './src//common'),
  'pages': path.resolve(__dirname, './src//pages'),
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1'
    }
  },
  plugins: [react()]
})