/**
 * 字符查找树
 * @constructor
 */
class Trie {
  constructor(keyArr) {
    // 层级 0 代表顶层
    this.tier = 0;
    // 值为0代表没匹配到，为1表示匹配到了
    this.empty = 1;
    // 对应的哈希表中的索引
    this.index = 0;
    this.children = {};
    keyArr && this.build(keyArr)
  }

  build(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      this.insert(arr[i], 0, i);
    }
  }

  insert(str, pos = 0, idx) {
    if (str.length === 0) {
      return;
    }
    const T = this;
    let s;
    let child;

    if (pos === str.length) {
      T.index = idx;
      return;
    }
    s = str[pos];
    if (T.children[s] === undefined) {
      T.children[s] = new Trie();
      T.empty = 0;
      T.children[s].tier = this.tier + 1;
    }
    child = T.children[s];
    child.insert(str, pos + 1, idx);
  }

  searchOne(str, pos = 0) {
    let result = {};
    if (str.length === 0) return result;
    const T = this;
    let child;
    let s;
    result.arr = [];
    s = str[pos];
    child = T.children[s];
    if (child !== undefined && pos < str.length) {
      return child.searchOne(str, pos + 1);
    }
    if (child === undefined && T.empty === 0) return result;
    if (T.empty == 1) {
      result.arr[0] = pos - T.tier;
      result.arr[1] = T.index;
      result.tier = T.tier;
      return result;
    }
    return result;
  }

  search(str) {
    if (this.empty == 1) return [];
    let len = str.length;
    let searchResult = [];
    let tmp;
    for (let i = 0; i < len - 1; i++) {
      tmp = this.searchOne(str, i);
      if (typeof tmp.arr !== 'undefined' && tmp.arr.length > 0) {
        searchResult.push(tmp.arr);
        i = i + tmp.tier - 1;
      }
    }
    return searchResult;
  }
}

export default Trie
