import Trie from './trie'
import emojiObj from './config/emoji'
import emojiPanel from './config/emojiPanel'

const emojiKeys = Object.keys(emojiObj)
const trie = new Trie(emojiKeys)
const emojiWidth = 24, emojiHeight = 24
let panelInfoCache = {}

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

function calculatePanelInfo(panelId, panel) {
  let {url, width, height, col, row, paddingTop, paddingBottom, paddingLeft, paddingRight, gapCol, gapRow} = panel
  if (!url) return ''
  // 计算背景宽度应该缩放到多少
  // 原图的emojiWidth
  let imgEmojiWidth = (width - paddingLeft - paddingRight - gapCol * (col - 1)) / col
  // bgWidth / width = emojiWidth / imgEmojiWidth 比例是相等的
  let scale = emojiWidth / imgEmojiWidth
  let bgWidth = width * scale
  panelInfoCache[panelId] = {scale, bgWidth}
  return panelInfoCache[panelId]
}

function getPanelEmojiTemplate(title, position, panelId) {
  let panel = emojiPanel[panelId]
  let {url, gapCol, gapRow} = panel
  if (!url) return ''
  let {scale, bgWidth} = panelInfoCache[panelId] || calculatePanelInfo(panelId, panel)
  if (typeof position === 'object') {
    let {col: targetCol, row: targetRow} = position
    let left = -(targetCol - 1) * (emojiWidth + scale * gapCol)
    let top = -(targetRow - 1) * (emojiHeight + scale * gapRow)
    position = `${left}px ${top}px`
  }
  return `<a title="${title}" style="display: inline-block;background: url(${url}) no-repeat;width: ${emojiWidth}px;
    height: ${emojiHeight}px; background-position:${position}; background-size: ${bgWidth}px;"></a>`
}

export default function emojiParser(str) {
  let matchedEmoji = trie.search(str);
  matchedEmoji.reverse().map((idx) => {
    let pos = idx[0], emotion = emojiKeys[idx[1]], emotionValue = emojiObj[emotion];
    let img = typeof emotionValue === 'object'
      ? getPanelEmojiTemplate(emotion, emotionValue.position, emotionValue.panel)
      : emotionValue.indexOf('http') !== -1
        ? '<img src="' + emotionValue + '" alt="' + emotion + '">'
        : emotionValue
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}
