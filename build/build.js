const path = require('path')
const esBuild = require('esbuild')
const ora = require('ora')
function pathResolve(dir) {
  return path.resolve(__dirname, '.', dir)
}
const outputOptions = [
  {
    outfile: 'dist/emoji-parser.esm.js',
    format: 'esm',
  },
  {
    outfile: 'dist/emoji-parser.common.js',
    format: 'cjs',
  },
  {
    outfile: 'dist/emoji-parser.js',
    format: 'iife',
    globalName: 'emojiParser'
  }
]
const baseOption = {
  entryPoints: [pathResolve('../src/index.ts')],
  bundle: true,
  treeShaking: true,
  // minify: true,
}

function build (){
  const oraRet = ora('start build...')
  oraRet.start()
  let tasks = []
  for (let i = 0; i < outputOptions.length; i++) {
    tasks.push(esBuild.build({...baseOption,...outputOptions[i] }))
  }
  Promise.all(tasks).then(()=>{
    oraRet.succeed('build success!')
  }).catch((e) => {
    console.error(e)
    oraRet.fail('build fail!')
    process.exit(1)
  })
}

build()
