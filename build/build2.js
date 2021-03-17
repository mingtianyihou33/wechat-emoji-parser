const path = require('path')

function pathResolve(dir) {
  return path.resolve(__dirname, '.', dir)
}

require('esbuild').build({
  entryPoints: [pathResolve('../src/index.ts')],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
