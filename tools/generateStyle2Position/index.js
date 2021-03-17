const fs = require('fs')


/**
 * return
 * {
    'e2_02': { width: '64px', height: '64px', 'background-position': '-66px 0' },
    'e2_04': {
      width: '64px',
      height: '64px',
      'background-position': '-462px -396px'
    },
    ...
  }
 */
function compilerCss2Object(str) {
  let res = {}
  let selector = ''
  let properties = null
  let key = ''
  let keyEnd = false
  let val = ''
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (/[ \n]/.test(char) && !val) {
      continue
    }
    if (char === '.') {
      selector = ''
      continue
    }
    if (char === '{') {
      properties = {}
      keyEnd = false
      key = ''
      val = ''
      continue
    }
    if (char === '}') {
      res[selector] = properties
      selector = ''
      properties = null
      continue
    }
    if (!properties) {
      selector += char
    } else {
      if (char === ':') {
        keyEnd = true
        continue
      }
      if (char === ';' || char === '\n') {
        keyEnd = false
        properties[key] = val
        key = ''
        val = ''
        continue
      }
      if (keyEnd) {
        val += char
      } else {
        key += char
      }
    }
  }
  return res
}

function generatePosition(data, cssObj) {
  let bpArr = ['0', '-66px', '-132px', '-198px', '-264px', '-330px', '-396px', '-462px', '-528px', '-594px', '-660px']
  return data.map(({style, ...res}) => {
    let bp = cssObj?.[style]?.['background-position']
    bp && (bp = bp.split(' '))
    let position = {x: 1, y: 1}
    if (bp && bp.length === 2) {
      position.x = bpArr.indexOf(bp[0])
      position.y = bpArr.indexOf(bp[1])
      return {position, ...res}
    }
    return {style, ...res}
  }).filter(item => item.position)
    .sort(({position: {x: x1, y: y1}}, {position: {x: x2, y: y2}})=>{
    return y1 === y2 ? (x1 - x2): (y1-y2)
  }).map((item, i)=> ({...item, id: i})) // 按排序重置id
}

function build(){
  const ora = require('ora')
  const oraInstance = ora('start build...')
  oraInstance.start('start build...')
  try {
    const css = fs.readFileSync('./input/style.css')
    const inputData = require('./input/data')
    const res = generatePosition(inputData, compilerCss2Object(css.toString()))
    if(!fs.existsSync('dist')){
      fs.mkdirSync('dist')
    }
    fs.writeFileSync('./dist/data.json', JSON.stringify(res))
    oraInstance.succeed('build success')
  }catch (e){
    oraInstance.fail(e.message)
  }
}

build()
