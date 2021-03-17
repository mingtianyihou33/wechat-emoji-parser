const json = require('@rollup/plugin-json')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const path = require('path')

function pathResolve(dir) {
  return path.resolve(__dirname, '.', dir)
}

const rollup = require('rollup')
const inputOptions = {
  input: 'src/index.ts',
  plugins: [json(), nodeResolve(), commonjs(), babel.babel({
    exclude: 'node_modules/**', // only transpile our source code
    babelHelpers: 'bundled'
  }),
    typescript({
      tsconfig: pathResolve('../tsconfig.json'),
      cacheDir: path.resolve(__dirname, '../node_modules/.cache/.ts'),
    })]
}
const baseOutputOptions = {
  sourcemap: false,
}
const outputOptions = [
  // {
  //   // file: 'dist/emoji-parser.esm.js',
  //   format: 'es',
  //   dir: 'dist',
  // },
  // {
  //   // file: 'dist/emoji-parser.common.js',
  //   format: 'cjs',
  //   dir: 'dist',
  // },
  {
    // file: 'dist/emoji-parser.js',
    format: 'umd',
    name: 'emojiParser',
    dir: 'dist',
  }
]

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  outputOptions.forEach(async option => {
    await bundle.write({...baseOutputOptions, ...option})
  })
  await bundle.close();
}

build()
