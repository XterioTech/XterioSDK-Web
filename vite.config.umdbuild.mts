import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
      // declarationDir: './dist/umd',
      outDir: './dist/umd'
    }),
    svgr()
  ],
  build: {
    minify: true,
    outDir: './dist/umd',
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'XterioAuth',
      formats: ['umd'],
      fileName: (format) => `xterio-auth-sdk.js`
    },
    rollupOptions: {
      treeshake: false,
      external: [],
      output: {
        dir: './dist/umd'
      }
    }
  }
})
