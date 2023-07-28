import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://arifian853.github.io/',
  plugins: [react(), eslint()],
}) 
 