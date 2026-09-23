import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

const copy404Plugin = () => ({
  name: 'copy-404',
  closeBundle() {
    const distPath = path.resolve(import.meta.dirname, './dist')
    const indexPath = path.join(distPath, 'index.html')
    const notFoundPath = path.join(distPath, '404.html')
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath)
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  base: '/agro/',
  plugins: [react(), tailwindcss(), copy404Plugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})



