import Trie from './utils/trie'
import {EMOJI_KEY_POSITION, EMOJI_PANEL} from './config/emoji'
import {stringSplice} from "./utils/uitl";

const emojiKeys = Object.keys(EMOJI_KEY_POSITION)
const trie = new Trie(emojiKeys)
const emojiOption: EmojiParserOption = {
  size: 64,
  tag: 'a',
  emojiSpriteUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png'
}


let panelScaleCache: { [key in number]: { scale: number, bgSize: number } } = {}

function calculateScaleAndBgSize(panel: EmojiPanel, emojiSize: number): { scale: number, bgSize: number } {
  if (panelScaleCache[emojiSize]) return panelScaleCache[emojiSize]
  let {width, x, paddingLeft, paddingRight, gapX} = panel
  // 计算背景宽度应该缩放到多少
  let originSize = (width - paddingLeft - paddingRight - gapX * (x - 1)) / x
  let scale = emojiSize / originSize
  let bgSize = width * scale // bgSize / width = emojiSize / originSize 比例是相等的
  panelScaleCache[emojiSize] = {scale, bgSize}
  return panelScaleCache[emojiSize]
}

export function transform2Html(name: string, position: EmojiData['position'], emojiOption: EmojiParserOption): string {
  let {gapX, gapY} = EMOJI_PANEL
  const emojiSize = emojiOption.size as number
  const url = emojiOption.emojiSpriteUrl as string
  let {scale, bgSize} = calculateScaleAndBgSize(EMOJI_PANEL, emojiSize)
  let bgPosition = ''
  if (position) {
    let {x, y} = position
    let left = -x * (emojiSize + scale * gapX)
    let top = -y * (emojiSize + scale * gapY)
    bgPosition = `${left}px ${top}px`
  }
  return `<a title="${name}" class="wx-emoji" style="display: inline-block;background: url(${url}) no-repeat;width: ${emojiSize}px;
    height: ${emojiSize}px; background-position:${bgPosition}; background-size: ${bgSize}px;"></a>`
}

export function emojiParser(str: string): string {
  if (!str) return str
  let matchedEmoji = trie.search(str);
  matchedEmoji.reverse().map(([emojiIndex, keyIndex]) => {
    let name = emojiKeys[keyIndex], position = EMOJI_KEY_POSITION[name];
    let html = transform2Html(name, position, emojiOption)
    str = stringSplice(str, emojiIndex, name.length, html);
  });
  return str;
}

export function initEmojiParser(option: EmojiParserOption | undefined) {
  if (option) {
    Object.assign(emojiOption, option)
  }
}
