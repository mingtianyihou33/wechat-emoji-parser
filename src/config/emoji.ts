import emoji from './emoji.json'
const emojiImgMap = import.meta.glob<string>('@/assets/emojis/*', {
  eager: true,
  import: 'default',
})
export const EMOJI_DATA: EmojiData[] = (emoji as EmojiData[]).map(item => {
  return {
    ...item,
    src: emojiImgMap[item.src],
  }
})

function transform2KeyIndex(data: EmojiData[]): Record<string, number> {
  let usedKeys = ['cn', 'us', 'code', 'web_code']
  let res: Record<string, number> = {}
  data.forEach((item: EmojiData, index) => {
    usedKeys.forEach((key: keyof Omit<EmojiData, 'id' | 'src'>) => {
      let trieKey = item[key]
      if (trieKey && trieKey !== '[]' && !(trieKey in res)) {
        res[trieKey] = index
      }
    })
  })
  return res
}

export const EMOJI_KEY_RELATE_EMOJI_INDEX: Record<string, number> =
  transform2KeyIndex(EMOJI_DATA)
