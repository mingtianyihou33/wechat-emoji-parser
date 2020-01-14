const json = require('rollup-plugin-json')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

const rollup = require('rollup')
const inputOptions = {
  input: 'src/index.js',
  plugins: [json(), resolve(), commonjs(), babel({
    exclude: 'node_modules/**' // only transpile our source code
  })]
}
const outputOptions = {
  file: 'dist/emoji-parser.js',
  format: 'es',
  sourcemap: true
}

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

build()
