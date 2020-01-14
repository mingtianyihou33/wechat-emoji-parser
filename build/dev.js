const rollup = require('rollup')
const json = require('rollup-plugin-json')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const ora = require('ora')

const inputOptions = {
  input: 'src/index.js',
  plugins: [json(), resolve(), commonjs()],
  external: ['lodash']
}
const outputOptions = {
  file: 'dist/bundle.js',
  format: 'es',
  sourcemap: true
}
const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
  watch: {}
}
let process
const watcher = rollup.watch(watchOptions)
watcher.on('event', event => {
  switch (event.code) {
    case 'START':
      if (!process) {
        process = ora('开始构建')
      }
      process.start()
      break
    case 'END':
      process.succeed()
      break
    case 'ERROR':
      process.fail()
      break
  }
})
