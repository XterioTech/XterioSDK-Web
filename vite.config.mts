import { ConfigEnv, defineConfig, loadEnv, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import packageJsonData from './package.json'
const version = packageJsonData.version

const dtsPlugin = dts({
  //dts工作根目录, xterio-auth
  root: './',
  entryRoot: './src',
  // outDir: ['./dist/es', './dist/lib'],
  outDir: ['./dist/types'],
  // 排除dts操作的目录
  exclude: [],
  aliasesExclude: [/axios/],
  tsconfigPath: './tsconfig.build.json'
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)

  const minify = mode === 'production'

  return {
    css: {
      preprocessorOptions: {
        //pro: Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
        //fix: https://stackoverflow.com/questions/68147471/how-to-set-sassoptions-in-vite/78997875#78997875
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    //插件配置
    plugins: [
      tsconfigPaths(),
      dtsPlugin,
      svgr(),
      nodePolyfills()
    ],
    //定义全局变量
    define: {
      __SDK_VERSION__: JSON.stringify(version),
    },
    //打包配置
    build: {
      sourcemap: minify,
      minify,
      outDir: 'dist',
      target: 'es2015',
      //rollup、lib二选一
      rollupOptions: {
        // external: [/package\.json/, /axios/, /js-cookie/, /js-base64/, /query-string/],
        input: ['./src/index.ts'],
        output: [
          {
            format: 'umd',
            entryFileNames: `[name]${minify ? '.min' : ''}.js`,
            exports: 'named',
            dir: './dist/umd',
            name: 'XterioAuth',
            banner: `\n /*! XterioAuth v${version} */\n`,
            footer: `\n /*! XterioAuth v${version} */\n`,
          },
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
        // name: 'XterioAuth'
        // fileName: 'xterio-auth',
        // formats: ['es', 'cjs', 'iife', 'umd']
      }
    },
    watch: {
      include: 'src/**', // 监控 src 目录的文件变化
      clearScreen: false, // 防止清空屏幕日志
    },

    //开发服务器配置
    server: {}
  }
})
