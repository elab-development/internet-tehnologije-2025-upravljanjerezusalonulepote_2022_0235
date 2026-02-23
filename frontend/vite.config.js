import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['**/*.{test,spec}.{js,jsx}'],
    server: {
      deps: {
        inline: [/@exodus\/bytes/, /html-encoding-sniffer/]
      }
    },
    deps: {
      optimizer: {
        web: {
          include: ['jsdom']
        }
      }
    }
  },
})