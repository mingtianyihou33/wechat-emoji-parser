const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const files = ['README.md', 'CHANGELOG.md', 'src/types', 'LICENSE']
const targetDir = path.join(__dirname, '../dist')
const rootDir = path.join(__dirname, '..')

async function copyFile(filename) {
  const inputPath = path.resolve(rootDir, filename)
  if (fs.statSync(inputPath).isDirectory()) {
    if (!fs.existsSync(path.resolve(targetDir, filename))) {
      fs.mkdirSync(path.resolve(targetDir, filename), { recursive: true })
    }
    const files = fs.readdirSync(inputPath)
    files.forEach(file => {
      copyFile(path.join(filename, file))
    })
    return
  }
  fs.copyFileSync(
    path.resolve(rootDir, filename),
    path.resolve(targetDir, filename),
  )
}
function modifyTsDefinePath() {
  const entranceFile = path.resolve(targetDir, 'types/index.d.ts')
  let content = fs.readFileSync(entranceFile).toString()
  content = `/// <reference path="../src/types/index.d.ts" />\n` + content
  fs.writeFileSync(entranceFile, content)
}
function generatePkgJson() {
  const data = {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    description: pkg.description,
    main: './index.js',
    types: './types/index.d.ts',
    repository: pkg.repository,
    keywords: pkg.keywords,
  }
  if (pkg.dependencies) {
    data.dependencies = pkg.dependencies
  }
  files.map(filename => copyFile(filename))
  fs.writeFileSync(
    path.resolve(targetDir, 'package.json'),
    JSON.stringify(data, null, 2),
    {
      encoding: 'utf-8',
    },
  )
  modifyTsDefinePath()
}

generatePkgJson()
