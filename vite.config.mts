import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { ConfigEnv, Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import packageJsonData from './package.json'
const version = packageJsonData.version

const particleWasmPlugin: Plugin | undefined = {
  name: 'particle-wasm',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'development';
  },
  buildStart: () => {
    const copiedPath = path.join(
      __dirname,
      'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm' //@particle-network/thresh-sig dir
    );
    if (!fs.existsSync(copiedPath)) return
    const dir = path.join(__dirname, 'node_modules/.vite/wasm');
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // console.log('copiedPath:', copiedPath)
    // console.log('resultPath:', resultPath)
    fs.copyFileSync(copiedPath, resultPath);
  },
};

const dtsPlugin = dts({
  //dts工作根目录, xterio-wallet
  root: './',
  entryRoot: './src',
  // outDir: ['./dist/es', './dist/lib'],
  outDir: ['./dist/types'],
  //排除dts操作的目录
  exclude: [],
  tsconfigPath: './tsconfig.build.json',
  aliasesExclude: [/package\.json/, /react\/*/, /react-dom\/*/, /@xterio-sdk\/auth\/*/, /ethers\/*/, /@particle-network\/*/, /viem\/*/],
  beforeWriteFile(filePath, content) {
    if (content.includes("../src/")) {
      console.log('change content *.d.ts:', filePath)
      content = content.replace(/src\//g, '')
    }
    return { filePath, content }
  },
})

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)
  const minify = mode === 'production'

  return {
    plugins: [tsconfigPaths(), react(), dtsPlugin, nodePolyfills()],
    define: {
      __SDK_VERSION__: JSON.stringify(version),
    },
    //打包配置
    build: {
      sourcemap: minify,
      minify,
      outDir: 'dist',
      target: 'es2020',
      // cssMinify: 'esbuild'
      //rollup、lib二选一
      rollupOptions: {
        //viem仅用了defineChain,@particle-network/auth-core仅用了类型, ethers仅用于getTransaction
        // external: [/package\.json/, /react\/*/, /react-dom\/*/, /@xterio-sdk\/auth\/*/, /ethers\/*/, /@particle-network\/*/, /viem\/*/],
        external: [/@xterio-sdk\/auth\/*/, /react\/*/, /react-dom\/*/, /@particle-network\/*/],
        input: ['./src/index.ts'],
        output: [
          // {
          //   //tip:pn 库用到react等三方库太多，umd形式使用过于负杂
          //   format: 'umd',
          //   entryFileNames: `[name]${minify ? '.min' : ''}.js`,
          //   exports: 'named',
          //   dir: './dist/umd',
          //   name: 'XterioWallet',
          //   banner: `\n /*! XterioWallet v${version} */ \n`,
          //   footer: `\n /*! XterioWallet v${version} */ \n`,
          //   globals: {
          //     '@xterio-sdk/auth': 'XterioAuth',
          //     'react': 'React',
          //     'react-dom': 'ReactDOM',
          //   }
          // },
          {
            format: 'esm',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: './src',
            exports: undefined,
            dir: './dist/es',
          },
          {
            format: 'commonjs',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: './src',
            exports: 'named',
            dir: './dist/lib',
          }
        ]
      },

      lib: {
        entry: './src/index.ts',
        // name: 'XterioWallet',
        // fileName: 'xterio-wallet',
        // formats: ['es', 'cjs', 'iife']
      }
    },
  }
})
