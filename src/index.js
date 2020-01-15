import Trie from './trie'
import emojiObj from './config/emoji'

const emojiKeys = Object.keys(emojiObj)
const trie = new Trie(emojiKeys)

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

let labelEmotion = `<a title="{{title}}" style="display: inline-block;background: url(https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png) no-repeat;width: 28px;
    height: 28px; background-position:{{position}};"></a>`;

export default function emojiParser(str) {
  let matchedEmoji = trie.search(str);
  matchedEmoji.map((idx) => {
    let pos = idx[0], emotion = emojiKeys[idx[1]];
    let img = /^:.*:$|^\[.*\]$/.test(emotion)
      ? labelEmotion.replace('{{title}}', emotion).replace('{{position}}', emojiObj[emotion])
      : '<img src="' + emojiObj[emotion] + '" alt="' + emotion + '">'
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}
