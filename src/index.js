import Trie from './trie'
import emojiObj from './config/emoji'
import emojiPanel from './config/emojiPanel'

const emojiKeys = Object.keys(emojiObj)
const trie = new Trie(emojiKeys)

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

function getPanelEmojiTemplate(title, position, panel) {
  return `<a title="${title}" style="display: inline-block;background: url(${emojiPanel[panel]}) no-repeat;width: 28px;
    height: 28px; background-position:${position};"></a>`
}

export default function emojiParser(str) {
  let matchedEmoji = trie.search(str);
  matchedEmoji.map((idx) => {
    let pos = idx[0], emotion = emojiKeys[idx[1]], emotionValue = emojiObj[emotion];
    let img = typeof emotionValue === 'object'
      ? getPanelEmojiTemplate(emotion, emotionValue.position, emotionValue.panel)
      : emotionValue.indexOf('http') !== -1
        ? '<img src="' + emotionValue + '" alt="' + emotion + '">'
        : emotionValue
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}
