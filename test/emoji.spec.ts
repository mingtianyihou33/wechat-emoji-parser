import { describe, expect, test } from 'vitest'
import { getEmojisByEmojiData, getEmojis } from '../src/emoji'

describe('emoji', function () {
  test('input emojiData[] should return correct style property in the result', () => {
    const emojiData = [
      {
        position: { x: 0, y: 0 },
        id: 0,
        cn: '[右哼哼]',
        hk: '[右哼哼]',
        us: '[Bah！R]',
        code: '/:@>',
        web_code: '/右哼哼',
      },
    ]
    const option = { emojiSpriteUrl: 'http://xxx.png', size: 64 }
    expect(getEmojisByEmojiData(emojiData)(option)).toEqual([
      {
        cn: '[右哼哼]',
        code: '/:@>',
        style: {
          background: 'url(http://xxx.png) no-repeat',
          'background-position': '0px 0px',
          'background-size': '767.61px',
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
      cn: '[右哼哼]',
      code: '/:@>',
      style: {
        background: 'url(http://xxx.png) no-repeat',
        'background-position': '0px 0px',
        'background-size': '767.61px',
        display: 'inline-block',
        height: '64px',
        width: '64px',
      },
    })
  })
})
