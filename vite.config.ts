import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    rolldownOptions: {
      output: {
        codeSplitting: true
      }
    }
  }
})