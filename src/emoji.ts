import { EMOJI_DATA } from './config/emoji'
import { getEmojiStyle } from './parser'

export function getEmojisByEmojiData(emojiData: EmojiData[]) {
  return function (option: EmojiParserOption | undefined): Emoji[] {
    let emojiOption: EmojiParserOption = {
      size: 64,
      emojiSpriteUrl:
        'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png',
    }
    if (option) {
      emojiOption = Object.assign(emojiOption, option)
    }
    return emojiData.map(({ position, code, cn }) => {
      let style = (position && getEmojiStyle(position, emojiOption)) || {}
      return { style, code, cn }
    })
  }
}

export const getEmojis =  getEmojisByEmojiData(EMOJI_DATA)
