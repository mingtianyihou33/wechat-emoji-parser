import assert from 'assert';
import emojiParser from '../src';

describe('emojiParser', function () {
  it('input /:strong/:strong should return <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif" alt="/:strong"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif" alt="/:strong">', () => {
    assert.equal(emojiParser('/:strong/:strong'), '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif" alt="/:strong"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif" alt="/:strong">')
  })
})
