import { EMOJI_DATA } from './config/emoji'
import { getEmojiStyle } from './parser'
export function getEmojisByEmojiData(emojiData: EmojiData[]) {
  return function (option: EmojiParserOption | undefined): Emoji[] {
    let emojiOption: EmojiParserOption = {
      size: 64,
    }
    if (option) {
      emojiOption = Object.assign(emojiOption, option)
    }
    return emojiData.map(({ code, cn, src }) => {
      let style = (src && getEmojiStyle(src, emojiOption)) || ({} as EmojiStyle)
      return { style, code, cn }
    })
  }
}

export const getEmojis = getEmojisByEmojiData(EMOJI_DATA)
