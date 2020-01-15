import Trie from './trie'
import emojiObj from './config/emoji'

const emojiKeys = Object.keys(emojiObj)
const trie = new Trie(emojiKeys)

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

export default function emojiParser(str) {
  let matchedEmoji = trie.search(str);
  matchedEmoji.map((idx) => {
    let pos = idx[0], emotion = emojiKeys[idx[1]],
      img = '<img src="' + emojiObj[emotion] + '" alt="' + emotion + '">';
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}
