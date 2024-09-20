import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [react()],
    define: {
      __EXAMPLE_ENV__: JSON.stringify(mode === 'production' ? 'Staging' : 'Dev')
    }
  }
})
