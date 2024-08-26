import Trie from './utils/trie'
import { EMOJI_KEY_POSITION, EMOJI_PANEL } from './config/emoji'
import { stringSplice } from './utils/uitl'
import emojiSprite from './assets/emoji-sprite.png'
const emojiKeys = Object.keys(EMOJI_KEY_POSITION)
const trie = new Trie(emojiKeys)

let panelScaleCache: { [key in number]: { scale: number; bgSize: number } } = {}

function calculateScaleAndBgSize(
  panel: EmojiPanel,
  emojiSize: number,
): { scale: number; bgSize: number } {
  if (panelScaleCache[emojiSize]) return panelScaleCache[emojiSize]
  let { width, x, paddingLeft, paddingRight, gapX } = panel
  // 计算背景宽度应该缩放到多少
  let originSize = (width - paddingLeft - paddingRight - gapX * (x - 1)) / x
  let scale = emojiSize / originSize
  let bgSize = +(width * scale).toFixed(2) // bgSize / width = emojiSize / originSize 比例是相等的
  panelScaleCache[emojiSize] = { scale, bgSize }
  return panelScaleCache[emojiSize]
}

export function getEmojiStyle(
  position: EmojiData['position'],
  emojiOption: EmojiParserOption,
): EmojiStyle {
  let { gapX, gapY } = EMOJI_PANEL
  const emojiSize = emojiOption.size as number
  const url = emojiOption.emojiSpriteUrl as string
  let { scale, bgSize } = calculateScaleAndBgSize(EMOJI_PANEL, emojiSize)
  let bgPosition = ''
  if (position) {
    let { x, y } = position
    let left = -(x * (emojiSize + scale * gapX)).toFixed(2)
    let top = -(y * (emojiSize + scale * gapY)).toFixed(2)
    bgPosition = `${left}px ${top}px`
  }
  return {
    display: 'inline-block',
    background: `url(${url}) no-repeat`,
    width: `${emojiSize}px`,
    height: `${emojiSize}px`,
    'background-position': `${bgPosition}`,
    'background-size': `${bgSize}px`,
  }
}

export function transform2Html(
  name: string,
  position: EmojiData['position'],
  emojiOption: EmojiParserOption,
): string {
  const tag = emojiOption.tag as string
  let style = ''
  let styleObj = getEmojiStyle(position, emojiOption)
  if (styleObj) {
    Object.keys(styleObj).forEach((key: keyof EmojiStyle) => {
      styleObj[key] !== undefined && (style += `${key}: ${styleObj[key]};`)
    })
  }
  return `<${tag} title="${name}" class="wx-emoji" style="${style}"></${tag}>`
}

const defaultEmojiOption: EmojiParserOption = {
  size: 64,
  tag: 'a',
  emojiSpriteUrl: emojiSprite,
}

export function parseEmoji(str: string): string {
  if (!str) return str
  let matchedEmoji = trie.search(str)
  matchedEmoji.reverse().map(([emojiIndex, keyIndex]) => {
    let name = emojiKeys[keyIndex],
      position = EMOJI_KEY_POSITION[name]
    let html = transform2Html(name, position, defaultEmojiOption)
    str = stringSplice(str, emojiIndex, name.length, html)
  })
  return str
}

export function configParseEmoji(option: EmojiParserOption | undefined) {
  if (option) {
    Object.assign(defaultEmojiOption, option)
  }
}
