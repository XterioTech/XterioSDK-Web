import { ConfigEnv, defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const particleWasmPlugin: Plugin | undefined = {
  name: 'particle-wasm',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'development'
  },
  buildStart: () => {
    const copiedPath = path.join(
      __dirname,
      'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm' //@particle-network/thresh-sig dir
    )
    if (!fs.existsSync(copiedPath)) return
    const dir = path.join(__dirname, 'node_modules/.vite/wasm')
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // console.log('copiedPath:', copiedPath)
    // console.log('resultPath:', resultPath)
    fs.copyFileSync(copiedPath, resultPath)
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [react(), particleWasmPlugin, nodePolyfills()],
    build: {
      minify: true,
      chunkSizeWarningLimit: 3024
    },
    define: {
      __EXAMPLE_ENV__: JSON.stringify(mode === 'production' ? 'Staging' : 'Dev')
    }
  }
})
