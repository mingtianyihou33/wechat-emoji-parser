/**
 * 字符查找树
 * @constructor
 */
class Trie {
  tier: number = 0 // 层级 0 代表顶层
  matched: boolean = true // 是否匹配到
  wordsIndex: number = 0 //
  children: {[key in string]: Trie}
  constructor(words?: string[]) {
    this.children = {};
    words && this.build(words)
  }

  build(words: string[]) :void{
    const len = words.length;
    for (let i = 0; i < len; i++) {
      this.insert(words[i], 0, i);
    }
  }

  insert(word: string, pos = 0, wordsIndex: number):void {
    if (word.length === 0) {
      return;
    }
    const T = this;
    let s;
    let child;

    if (pos === word.length) {
      T.wordsIndex = wordsIndex;
      return;
    }
    s = word[pos];
    if (T.children[s] === undefined) {
      T.children[s] = new Trie();
      T.matched = false;
      T.children[s].tier = this.tier + 1;
    }
    child = T.children[s];
    child.insert(word, pos + 1, wordsIndex);
  }

  searchOne(str: string, pos = 0): null| {matchedPosition: [number, number], tier: number} {
    if (str.length === 0) return null;
    const T = this;
    let child;
    let s;
    s = str[pos];
    child = T.children[s];
    if (child !== undefined && pos < str.length) {
      return child.searchOne(str, pos + 1);
    }
    if (child === undefined && !T.matched) return null;
    if (T.matched) {
      // matchedPosition: [startIndex of str, wordsIndex of words]
      return {matchedPosition:[pos - T.tier, T.wordsIndex], tier: T.tier};
    }
    return null;
  }

  search(str: string) {
    if (this.matched) return [];
    let len = str.length;
    let searchResult = [];
    let res;
    for (let i = 0; i < len - 1; i++) {
      res = this.searchOne(str, i);
      if (res) {
        searchResult.push(res.matchedPosition);
        i = i + res.tier - 1;
      }
    }
    return searchResult;
  }
}

export default Trie
