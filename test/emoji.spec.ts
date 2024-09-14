import { describe, expect, test } from 'vitest'
import { getEmojisByEmojiData, getEmojis } from '../src/emoji'
import { EMOJI_DATA } from '../src/config/emoji'

describe('emoji', function () {
  test('input emojiData[] should return correct style property in the result', () => {
    const emojiData = [EMOJI_DATA[0]]
    const option = { emojiSpriteUrl: 'http://xxx.png', size: 64 }
    expect(getEmojisByEmojiData(emojiData)(option)).toEqual([
      {
        cn: emojiData[0].cn,
        code: emojiData[0].code,
        style: {
          background: `url(${emojiData[0].src}) no-repeat`,
          'background-size': '64px',
          display: 'inline-block',
          height: '64px',
          width: '64px',
        },
      },
    ])
  })
  test('input nothing should return correct style property in the result', () => {
    const option = { emojiSpriteUrl: 'http://xxx.png', size: 64 }
    expect(getEmojis(option)[0]).toEqual({
      cn: EMOJI_DATA[0].cn,
      code: EMOJI_DATA[0].code,
      style: {
        background: `url(${EMOJI_DATA[0].src}) no-repeat`,
        'background-size': '64px',
        display: 'inline-block',
        height: '64px',
        width: '64px',
      },
    })
  })
})
