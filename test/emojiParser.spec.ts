import { describe, expect, test } from 'vitest'
import { parseEmoji, configParseEmoji } from '../src/parser'
import { EMOJI_DATA } from '../src/config/emoji'

describe('parseEmoji', function () {
  test('input [右哼哼] should return "<a title=\\"[右哼哼]\\" class=\\"wx-emoji\\" style=\\"display: inline-block;background: url() no-repeat;width: 64px;height: 64px;background-position: 0px 0px;background-size: 767.61px;\\"></a>"', () => {
    configParseEmoji({ emojiSpriteUrl: '', tag: 'a', size: 64 })
    expect(parseEmoji(EMOJI_DATA[0].cn)).toBe(
      `<a title="${EMOJI_DATA[0].cn}" class="wx-emoji" style="display: inline-block;background: url(${EMOJI_DATA[0].src}) no-repeat;width: 64px;height: 64px;background-size: 64px;"></a>`,
    )
  })
  test('input sdfasdfa should return sdfasdfa because not match', () => {
    expect(parseEmoji('sdfasdfa')).toBe('sdfasdfa')
  })
})
