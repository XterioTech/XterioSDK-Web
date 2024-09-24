import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import packageJsonData from './package.json'
const version = packageJsonData.version

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)
  const minify = mode === 'production'

  return {
    plugins: [tsconfigPaths(), react(), nodePolyfills()],
    define: {
      __SDK_VERSION__: JSON.stringify(version),
    },
    //打包配置
    build: {
      sourcemap: minify,
      minify,
      outDir: './dist/umd',
      emptyOutDir: false,
      target: 'es2020',
      //rollup、lib二选一
      rollupOptions: {
        //viem仅用了defineChain,@particle-network/auth-core仅用了类型, ethers仅用于getTransaction
        // external: [/package\.json/, /react\/*/, /react-dom\/*/, /@xterio-sdk\/auth\/*/, /ethers\/*/, /@particle-network\/*/, /viem\/*/],
        external: [/@xterio-sdk\/auth\/*/, /react\/*/, /react-dom\/*/],
        input: ['./src/index.ts'],
        output: [
          {
            format: 'umd',
            entryFileNames: `[name]${minify ? '.min' : ''}.js`,
            exports: 'named',
            dir: './dist/umd',
            name: 'XterioWallet',
            banner: `\n /*! XterioWallet v${version} */ \n`,
            footer: `\n /*! XterioWallet v${version} */ \n`,
            globals: {
              '@xterio-sdk/auth': 'XterioAuth',
              react: 'React',
              'react-dom': 'ReactDOM',
            }
          },
        ],
      },

      lib: {
        entry: './src/index.ts',
      }
    },
  }
})
