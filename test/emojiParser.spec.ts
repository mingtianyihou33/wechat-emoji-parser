import { emojiParser, configEmojiParser } from '../src/parser'

describe('emojiParser', function () {
  test('input [右哼哼] should return "<a title=\\"[右哼哼]\\" class=\\"wx-emoji\\" style=\\"display: inline-block;background: url() no-repeat;width: 64px;height: 64px;background-position: 0px 0px;background-size: 767.61px;\\"></a>"', () => {
    configEmojiParser({ emojiSpriteUrl: '', tag: 'a', size: 64 })
    expect(emojiParser('[右哼哼]')).toBe(
      '<a title="[右哼哼]" class="wx-emoji" style="display: inline-block;background: url() no-repeat;width: 64px;height: 64px;background-position: 0px 0px;background-size: 767.61px;"></a>',
    )
  })
  test('input [右哼哼] should return "<a title=\\"[右哼哼]\\" class=\\"wx-emoji\\" style=\\"display: inline-block;background: url(http://xxx.png) no-repeat;width: 64px;height: 64px;background-position: 0px 0px;background-size: 767.61px;\\"></a>"', () => {
    configEmojiParser({ emojiSpriteUrl: 'http://xxx.png', tag: 'a', size: 64 })
    expect(emojiParser('[右哼哼]')).toBe(
      '<a title="[右哼哼]" class="wx-emoji" style="display: inline-block;background: url(http://xxx.png) no-repeat;width: 64px;height: 64px;background-position: 0px 0px;background-size: 767.61px;"></a>',
    )
  })
})
