import Trie from './utils/trie'
import { EMOJI_DATA, EMOJI_KEY_RELATE_EMOJI_INDEX } from './config/emoji'
import { stringSplice } from './utils/uitl'
const emojiKeys = Object.keys(EMOJI_KEY_RELATE_EMOJI_INDEX)
const trie = new Trie(emojiKeys)

export function getEmojiStyle(
  src: string,
  emojiOption: EmojiParserOption,
): EmojiStyle {
  const emojiSize = emojiOption.size as number
  return {
    display: 'inline-block',
    background: `url(${src}) no-repeat`,
    width: `${emojiSize}px`,
    height: `${emojiSize}px`,
    'background-size': `${emojiSize}px`,
  }
}

export function transform2Html(
  name: string,
  index: number,
  emojiOption: EmojiParserOption,
): string {
  const tag = emojiOption.tag as string
  let style = ''
  let styleObj = getEmojiStyle(EMOJI_DATA[index].src, emojiOption)
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
}

export function parseEmoji(str: string): string {
  if (!str) return str
  let matchedEmoji = trie.search(str)
  matchedEmoji.reverse().map(([emojiIndex, keyIndex]) => {
    let name = emojiKeys[keyIndex],
      index = EMOJI_KEY_RELATE_EMOJI_INDEX[name]
    let html = transform2Html(name, index, defaultEmojiOption)
    str = stringSplice(str, emojiIndex, name.length, html)
  })
  return str
}

export function configParseEmoji(option: EmojiParserOption | undefined) {
  if (option) {
    Object.assign(defaultEmojiOption, option)
  }
}
