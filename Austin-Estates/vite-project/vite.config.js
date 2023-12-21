import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ViteMarkdownPlugin from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteMarkdownPlugin()],
});
