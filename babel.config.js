module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    // [
    //   'module-resolver',
    //   {
    //     root: ['./src'],
    //     extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    //     alias: {
    //       '@utils': './src/utils'
    //     }
    //   }
    // ]
  ]
}
