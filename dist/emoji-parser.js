var emojiParser = (() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    configEmojiParser: () => configEmojiParser,
    emojiParser: () => emojiParser,
    getEmojis: () => getEmojis
  });

  // src/utils/trie.ts
  var Trie = class {
    constructor(words) {
      this.tier = 0;
      this.matched = true;
      this.wordsIndex = 0;
      this.children = {};
      words && this.build(words);
    }
    build(words) {
      const len = words.length;
      for (let i = 0; i < len; i++) {
        this.insert(words[i], 0, i);
      }
    }
    insert(word, pos = 0, wordsIndex) {
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
      if (T.children[s] === void 0) {
        T.children[s] = new Trie();
        T.matched = false;
        T.children[s].tier = this.tier + 1;
      }
      child = T.children[s];
      child.insert(word, pos + 1, wordsIndex);
    }
    searchOne(str, pos = 0) {
      if (str.length === 0)
        return null;
      const T = this;
      let child;
      let s;
      s = str[pos];
      child = T.children[s];
      if (child !== void 0 && pos < str.length) {
        return child.searchOne(str, pos + 1);
      }
      if (child === void 0 && !T.matched)
        return null;
      if (T.matched) {
        return {matchedPosition: [pos - T.tier, T.wordsIndex], tier: T.tier};
      }
      return null;
    }
    search(str) {
      if (this.matched)
        return [];
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
  };
  var trie_default = Trie;

  // src/config/emoji.ts
  var EMOJI_PANEL = {
    width: 724,
    height: 658,
    x: 11,
    y: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    gapX: 6,
    gapY: 6
  };
  var EMOJI_DATA = [
    {
      position: {x: 0, y: 0},
      id: 0,
      cn: "[\u53F3\u54FC\u54FC]",
      hk: "[\u53F3\u54FC\u54FC]",
      us: "[Bah\uFF01R]",
      code: "/:@>",
      web_code: "/\u53F3\u54FC\u54FC"
    },
    {
      position: {x: 1, y: 0},
      id: 1,
      cn: "[\u5978\u7B11]",
      hk: "[\u5978\u7B11]",
      us: "[Smirk]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 2, y: 0},
      id: 2,
      cn: "[\u7EA2\u5305]",
      hk: "[Packet]",
      us: "[Packet]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 3, y: 0},
      id: 3,
      cn: "[\u751F\u75C5]",
      emoji: "\u{1F637}",
      hk: "",
      us: "",
      code: "\\ue40c",
      web_code: ""
    },
    {
      position: {x: 4, y: 0},
      id: 4,
      cn: "[\u51B7\u6C57]",
      hk: "[\u51B7\u6C57]",
      us: "[Blush]",
      code: "/:--b",
      web_code: "/\u51B7\u6C57"
    },
    {
      position: {x: 5, y: 0},
      id: 5,
      cn: "[\u60CA\u6050]",
      hk: "[\u9A5A\u6050]",
      us: "[Panic]",
      code: "/::!",
      web_code: "/\u60CA\u6050"
    },
    {
      position: {x: 6, y: 0},
      id: 6,
      cn: "[Emm]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 7, y: 0},
      id: 7,
      cn: "[\u5F97\u610F]",
      hk: "[\u5F97\u610F]",
      us: "[CoolGuy]",
      code: "/:8-)",
      web_code: "/\u5F97\u610F"
    },
    {
      position: {x: 8, y: 0},
      id: 8,
      cn: "[\u83DC\u5200]",
      hk: "[\u83DC\u5200]",
      us: "[Cleaver]",
      code: "/:pd",
      web_code: "/\u83DC\u5200"
    },
    {
      position: {x: 9, y: 0},
      id: 9,
      cn: "[\u592A\u9633]",
      hk: "[\u592A\u967D]",
      us: "[Sun]",
      code: "/:sun",
      web_code: "/\u592A\u9633"
    },
    {
      position: {x: 10, y: 0},
      id: 10,
      cn: "[\u5F3A\u58EE]",
      emoji: "\u{1F4AA}",
      hk: "",
      us: "",
      code: "\\ue14c",
      web_code: ""
    },
    {
      position: {x: 0, y: 1},
      id: 11,
      cn: "[\u6342\u8138]",
      hk: "[\u63A9\u9762]",
      us: "[Facepalm]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 1, y: 1},
      id: 12,
      cn: "[\u673A\u667A]",
      hk: "[\u6A5F\u667A]",
      us: "[Smart]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 2, y: 1},
      id: 13,
      cn: "[\u8036]",
      hk: "[\u6B50\u8036]",
      us: "[Yeah!]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 3, y: 1},
      id: 14,
      cn: "[\u5C34\u5C2C]",
      hk: "[\u5C37\u5C2C]",
      us: "[Awkward]",
      code: "/::-|",
      web_code: "/\u5C34\u5C2C"
    },
    {
      position: {x: 4, y: 1},
      id: 15,
      cn: "[\u6293\u72C2]",
      hk: "[\u6293\u72C2]",
      us: "[Scream]",
      code: "/::Q",
      web_code: "/\u6293\u72C2"
    },
    {
      position: {x: 5, y: 1},
      id: 16,
      cn: "[\u6D41\u6C57]",
      hk: "[\u6D41\u6C57]",
      us: "[Sweat]",
      code: "/::L",
      web_code: "/\u6D41\u6C57"
    },
    {
      position: {x: 6, y: 1},
      id: 17,
      cn: "[\u793E\u4F1A\u793E\u4F1A]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 7, y: 1},
      id: 18,
      cn: "[\u64E6\u6C57]",
      hk: "[\u64E6\u6C57]",
      us: "[Speechless]",
      code: "/:wipe",
      web_code: "/\u64E6\u6C57"
    },
    {
      position: {x: 8, y: 1},
      id: 19,
      cn: "[\u897F\u74DC]",
      hk: "[\u897F\u74DC]",
      us: "[Watermelon]",
      code: "/:<W>",
      web_code: "/\u897F\u74DC"
    },
    {
      position: {x: 9, y: 1},
      id: 20,
      cn: "[\u62E5\u62B1]",
      hk: "[\u64C1\u62B1]",
      us: "[Hug]",
      code: "/:hug",
      web_code: "/\u62E5\u62B1"
    },
    {
      position: {x: 10, y: 1},
      id: 21,
      cn: "[\u7834\u6D95\u4E3A\u7B11]",
      emoji: "\u{1F602}",
      hk: "",
      us: "",
      code: "\\ue412",
      web_code: ""
    },
    {
      position: {x: 0, y: 2},
      id: 22,
      cn: "[\u76B1\u7709]",
      hk: "[\u76BA\u7709]",
      us: "[Moue]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 1, y: 2},
      id: 23,
      cn: "[\u9E21]",
      hk: "[\u5C0F\u96DE]",
      us: "[Chick]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 2, y: 2},
      id: 24,
      cn: "[\u5FAE\u7B11]",
      hk: "[\u5FAE\u7B11]",
      us: "[Smile]",
      code: "/::)",
      web_code: "/\u5FAE\u7B11"
    },
    {
      position: {x: 3, y: 2},
      id: 25,
      cn: "[\u53D1\u6012]",
      hk: "[\u767C\u6012]",
      us: "[Angry]",
      code: "/::@",
      web_code: "/\u53D1\u6012"
    },
    {
      position: {x: 4, y: 2},
      id: 26,
      cn: "[\u5410]",
      hk: "[\u5410]",
      us: "[Puke]",
      code: "/::T",
      web_code: "/\u5410"
    },
    {
      position: {x: 5, y: 2},
      id: 27,
      cn: "[\u61A8\u7B11]",
      hk: "[\u5927\u7B11]",
      us: "[Laugh]",
      code: "/::>",
      web_code: "/\u61A8\u7B11"
    },
    {
      position: {x: 6, y: 2},
      id: 28,
      cn: "[\u65FA\u67F4]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 7, y: 2},
      id: 29,
      cn: "[\u62A0\u9F3B]",
      hk: "[\u6473\u9F3B]",
      us: "[NosePick]",
      code: "/:dig",
      web_code: "/\u62A0\u9F3B"
    },
    {
      position: {x: 8, y: 2},
      id: 30,
      cn: "[\u5564\u9152]",
      hk: "[\u5564\u9152]",
      us: "[Beer]",
      code: "/:beer",
      web_code: "/\u5564\u9152"
    },
    {
      position: {x: 9, y: 2},
      id: 31,
      cn: "[\u5F3A]",
      hk: "[\u5F37]",
      us: "[ThumbsUp]",
      code: "/:strong",
      web_code: "/\u5F3A"
    },
    {
      position: {x: 10, y: 2},
      id: 32,
      cn: "[\u7B11\u8138]",
      emoji: "\u{1F604}",
      hk: "",
      us: "",
      code: "\\ue415",
      web_code: ""
    },
    {
      position: {x: 0, y: 3},
      id: 33,
      cn: "[\u8C03\u76AE]",
      hk: "[\u8ABF\u76AE]",
      us: "[Tongue]",
      code: "/::P",
      web_code: "/\u8C03\u76AE"
    },
    {
      position: {x: 1, y: 3},
      id: 34,
      cn: "[\u5472\u7259]",
      hk: "[\u5472\u7259]",
      us: "[Grin]",
      code: "/::D",
      web_code: "/\u5472\u7259"
    },
    {
      position: {x: 2, y: 3},
      id: 35,
      cn: "[\u60CA\u8BB6]",
      hk: "[\u9A5A\u8A1D]",
      us: "[Surprise]",
      code: "/::O",
      web_code: "/\u60CA\u8BB6"
    },
    {
      position: {x: 3, y: 3},
      id: 36,
      cn: "[\u96BE\u8FC7]",
      hk: "[\u96E3\u904E]",
      us: "[Frown]",
      code: "/::(",
      web_code: "/\u96BE\u8FC7"
    },
    {
      position: {x: 4, y: 3},
      id: 37,
      cn: "[\u8272]",
      hk: "[\u8272]",
      us: "[Drool]",
      code: "/::B",
      web_code: "/\u8272"
    },
    {
      position: {x: 5, y: 3},
      id: 38,
      cn: "[\u60A0\u95F2]",
      hk: "[\u60A0\u9591]",
      us: "[Commando]",
      code: "/::,@",
      web_code: "/\u5927\u5175"
    },
    {
      position: {x: 6, y: 3},
      id: 39,
      cn: "[\u7591\u95EE]",
      hk: "[\u7591\u554F]",
      us: "[Shocked]",
      code: "/:?",
      web_code: "/\u7591\u95EE"
    },
    {
      position: {x: 7, y: 3},
      id: 40,
      cn: "[\u9F13\u638C]",
      hk: "[\u9F13\u638C]",
      us: "[Clap]",
      code: "/:handclap",
      web_code: "/\u9F13\u638C"
    },
    {
      position: {x: 8, y: 3},
      id: 41,
      cn: "[\u5BB3\u7F9E]",
      hk: "[\u5BB3\u7F9E]",
      us: "[Shy]",
      code: "/::$",
      web_code: "/\u5BB3\u7F9E"
    },
    {
      position: {x: 9, y: 3},
      id: 42,
      cn: "[\u7761]",
      hk: "[\u7761]",
      us: "[Sleep]",
      code: "/::Z",
      web_code: "/\u7761"
    },
    {
      position: {x: 10, y: 3},
      id: 43,
      cn: "[\u65E0\u8BED]",
      emoji: "\u{1F612}",
      hk: "",
      us: "",
      code: "\\ue40e",
      web_code: ""
    },
    {
      position: {x: 0, y: 4},
      id: 44,
      cn: "[\u5077\u7B11]",
      hk: "[\u5077\u7B11]",
      us: "[Chuckle]",
      code: "/:,@P",
      web_code: "/\u5077\u7B11"
    },
    {
      position: {x: 1, y: 4},
      id: 45,
      cn: "[\u6109\u5FEB]",
      hk: "[\u6109\u5FEB]",
      us: "[Joyful]",
      code: "/:,@-D",
      web_code: "/\u53EF\u7231"
    },
    {
      position: {x: 2, y: 4},
      id: 46,
      cn: "[\u767D\u773C]",
      hk: "[\u767D\u773C]",
      us: "[Slight]",
      code: "/::d",
      web_code: "/\u767D\u773C"
    },
    {
      position: {x: 3, y: 4},
      id: 47,
      cn: "[\u50B2\u6162]",
      hk: "[\u50B2\u6162]",
      us: "[Smug]",
      code: "/:,@o",
      web_code: "/\u50B2\u6162"
    },
    {
      position: {x: 4, y: 4},
      id: 48,
      cn: "[\u56F0]",
      hk: "[\u7D2F]",
      us: "[Drowsy]",
      code: "/:|-)",
      web_code: "/\u56F0"
    },
    {
      position: {x: 5, y: 4},
      id: 49,
      cn: "[\u53D1\u5446]",
      hk: "[\u767C\u5446]",
      us: "[Scowl]",
      code: "/::|",
      web_code: "/\u53D1\u5446"
    },
    {
      position: {x: 6, y: 4},
      id: 50,
      cn: "[\u597D\u7684]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 7, y: 4},
      id: 51,
      cn: "[\u574F\u7B11]",
      hk: "[\u58DE\u7B11]",
      us: "[Trick]",
      code: "/:B-)",
      web_code: "/\u574F\u7B11"
    },
    {
      position: {x: 8, y: 4},
      id: 52,
      cn: "[\u5496\u5561]",
      hk: "[\u5496\u5561]",
      us: "[Coffee]",
      code: "/:coffee",
      web_code: "/\u5496\u5561"
    },
    {
      position: {x: 9, y: 4},
      id: 53,
      cn: "[\u5F31]",
      hk: "[\u5F31]",
      us: "[ThumbsDown]",
      code: "/:weak",
      web_code: "/\u5F31"
    },
    {
      position: {x: 10, y: 4},
      id: 54,
      cn: "[\u5931\u671B]",
      emoji: "\u{1F614}",
      hk: "",
      us: "",
      code: "\\ue403",
      web_code: ""
    },
    {
      position: {x: 0, y: 5},
      id: 55,
      cn: "[\u594B\u6597]",
      hk: "[\u596E\u9B25]",
      us: "[Determined]",
      code: "/:,@f",
      web_code: "/\u594B\u6597"
    },
    {
      position: {x: 1, y: 5},
      id: 56,
      cn: "[\u5492\u9A82]",
      hk: "[\u5492\u7F75]",
      us: "[Scold]",
      code: "/::-S",
      web_code: "/\u5492\u9A82"
    },
    {
      position: {x: 2, y: 5},
      id: 57,
      cn: "[\u5403\u74DC]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 3, y: 5},
      id: 58,
      cn: "[\u52A0\u6CB9]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 4, y: 5},
      id: 59,
      cn: "[\u6C57]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 5, y: 5},
      id: 60,
      cn: "[\u5929\u554A]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 6, y: 5},
      id: 61,
      cn: "[\u6253\u8138]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 7, y: 5},
      id: 62,
      cn: "[\u5DE6\u54FC\u54FC]",
      hk: "[\u5DE6\u54FC\u54FC]",
      us: "[Bah\uFF01L]",
      code: "/:<@",
      web_code: "/\u5DE6\u54FC\u54FC"
    },
    {
      position: {x: 8, y: 5},
      id: 63,
      cn: "[\u996D]",
      hk: "[\u98EF]",
      us: "[Rice]",
      code: "/:eat",
      web_code: "/\u996D"
    },
    {
      position: {x: 9, y: 5},
      id: 64,
      cn: "[\u63E1\u624B]",
      hk: "[\u63E1\u624B]",
      us: "[Shake]",
      code: "/:share",
      web_code: "/\u63E1\u624B"
    },
    {
      position: {x: 10, y: 5},
      id: 65,
      cn: "[\u5410\u820C]",
      emoji: "\u{1F61D}",
      hk: "",
      us: "",
      code: "\\ue409",
      web_code: ""
    },
    {
      position: {x: 0, y: 6},
      id: 66,
      cn: "[\u54C7]",
      hk: "[]",
      us: "[]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 1, y: 6},
      id: 67,
      cn: "[\u5618]",
      hk: "[\u5653]",
      us: "[Shhh]",
      code: "/:,@x",
      web_code: "/\u5618"
    },
    {
      position: {x: 2, y: 6},
      id: 68,
      cn: "[\u6655]",
      hk: "[\u6688]",
      us: "[Dizzy]",
      code: "/:,@@",
      web_code: "/\u6655"
    },
    {
      position: {x: 3, y: 6},
      id: 69,
      cn: "[\u8870]",
      hk: "[\u8870]",
      us: "[Toasted]",
      code: "/:,@!",
      web_code: "/\u8870"
    },
    {
      position: {x: 4, y: 6},
      id: 70,
      cn: "[\u9AB7\u9AC5]",
      hk: "[\u9AB7\u9ACF\u982D]",
      us: "[Skull]",
      code: "/:!!!",
      web_code: "/\u9AB7\u9AC5"
    },
    {
      position: {x: 5, y: 6},
      id: 71,
      cn: "[\u6572\u6253]",
      hk: "[\u6572\u6253]",
      us: "[Hammer]",
      code: "/:xx",
      web_code: "/\u6572\u6253"
    },
    {
      position: {x: 6, y: 6},
      id: 72,
      cn: "[\u518D\u89C1]",
      hk: "[\u518D\u898B]",
      us: "[Wave]",
      code: "/:bye",
      web_code: "/\u518D\u89C1"
    },
    {
      position: {x: 7, y: 6},
      id: 73,
      cn: "[\u563F\u54C8]",
      hk: "[\u543C\u563F]",
      us: "[Hey]",
      code: "",
      web_code: ""
    },
    {
      position: {x: 8, y: 6},
      id: 74,
      cn: "[\u732A\u5934]",
      hk: "[\u8C6C\u982D]",
      us: "[Pig]",
      code: "/:pig",
      web_code: "/\u732A\u5934"
    },
    {
      position: {x: 9, y: 6},
      id: 75,
      cn: "[\u80DC\u5229]",
      hk: "[\u52DD\u5229]",
      us: "[Peace]",
      code: "/:v",
      web_code: "/\u80DC\u5229"
    },
    {
      position: {x: 10, y: 6},
      id: 76,
      cn: "[\u6050\u60E7]",
      emoji: "\u{1F631}",
      hk: "",
      us: "",
      code: "\\ue107",
      web_code: ""
    },
    {
      position: {x: 0, y: 7},
      id: 77,
      cn: "[\u54C8\u6B20]",
      hk: "[\u54C8\u6B20]",
      us: "[Yawn]",
      code: "/::-O",
      web_code: "/\u54C8\u6B20"
    },
    {
      position: {x: 1, y: 7},
      id: 78,
      cn: "[\u9119\u89C6]",
      hk: "[\u9119\u8996]",
      us: "[Pooh-pooh]",
      code: "/:>-|",
      web_code: "/\u9119\u89C6"
    },
    {
      position: {x: 2, y: 7},
      id: 79,
      cn: "[\u59D4\u5C48]",
      hk: "[\u59D4\u5C48]",
      us: "[Shrunken]",
      code: "/:P-(",
      web_code: "/\u59D4\u5C48"
    },
    {
      position: {x: 3, y: 7},
      id: 80,
      cn: "[\u6D41\u6CEA]",
      hk: "[\u6D41\u6DDA]",
      us: "[Sob]",
      code: "/::<",
      web_code: "/\u6D41\u6CEA"
    },
    {
      position: {x: 4, y: 7},
      id: 81,
      cn: "[\u5FEB\u54ED\u4E86]",
      hk: "[\u5FEB\u54ED\u4E86]",
      us: "[TearingUp]",
      code: '/::"|',
      web_code: "/\u5FEB\u54ED\u4E86"
    },
    {
      position: {x: 5, y: 7},
      id: 82,
      cn: "[\u9634\u9669]",
      hk: "[\u9670\u96AA]",
      us: "[Sly]",
      code: "/:X-)",
      web_code: "/\u9634\u9669"
    },
    {
      position: {x: 6, y: 7},
      id: 83,
      cn: "[\u4EB2\u4EB2]",
      hk: "[\u89AA\u89AA]",
      us: "[Kiss]",
      code: "/::*",
      web_code: "/\u4EB2\u4EB2"
    },
    {
      position: {x: 7, y: 7},
      id: 84,
      cn: "[\u53EF\u601C]",
      hk: "[\u53EF\u6190]",
      us: "[Whimper]",
      code: "/:8*",
      web_code: "/\u53EF\u601C"
    },
    {
      position: {x: 8, y: 7},
      id: 85,
      cn: "[\u73AB\u7470]",
      hk: "[\u73AB\u7470]",
      us: "[Rose]",
      code: "/:rose",
      web_code: "/\u73AB\u7470"
    },
    {
      position: {x: 9, y: 7},
      id: 86,
      cn: "[\u62B1\u62F3]",
      hk: "[\u62B1\u62F3]",
      us: "[Fight]",
      code: "/:@)",
      web_code: "/\u62B1\u62F3"
    },
    {
      position: {x: 10, y: 7},
      id: 87,
      cn: "[\u8138\u7EA2]",
      emoji: "\u{1F633}",
      hk: "",
      us: "",
      code: "\\ue40d",
      web_code: ""
    },
    {
      position: {x: 0, y: 8},
      id: 88,
      cn: "[\u51CB\u8C22]",
      hk: "[\u67AF\u840E]",
      us: "[Wilt]",
      code: "/:fade",
      web_code: "/\u51CB\u8C22"
    },
    {
      position: {x: 1, y: 8},
      id: 89,
      cn: "[\u5634\u5507]",
      hk: "[\u5634\u5507]",
      us: "[Lips]",
      code: "/:showlove",
      web_code: "/\u793A\u7231"
    },
    {
      position: {x: 2, y: 8},
      id: 90,
      cn: "[\u7231\u5FC3]",
      hk: "[\u611B\u5FC3]",
      us: "[Heart]",
      code: "/:heart",
      web_code: "/\u7231\u5FC3"
    },
    {
      position: {x: 3, y: 8},
      id: 91,
      cn: "[\u5FC3\u788E]",
      hk: "[\u5FC3\u788E]",
      us: "[BrokenHeart]",
      code: "/:break",
      web_code: "/\u5FC3\u788E"
    },
    {
      position: {x: 4, y: 8},
      id: 92,
      cn: "[\u86CB\u7CD5]",
      hk: "[\u86CB\u7CD5]",
      us: "[Cake]",
      code: "/:cake",
      web_code: "/\u86CB\u7CD5"
    },
    {
      position: {x: 5, y: 8},
      id: 93,
      cn: "[\u95ED\u5634]",
      hk: "[\u9589\u5634]",
      us: "[Silent]",
      code: "/::X",
      web_code: "/\u95ED\u5634"
    },
    {
      position: {x: 6, y: 8},
      id: 94,
      cn: "[\u70B8\u5F39]",
      hk: "[\u70B8\u5F48]",
      us: "[Bomb]",
      code: "/:bome",
      web_code: "/\u70B8\u5F39"
    },
    {
      position: {x: 7, y: 8},
      id: 95,
      cn: "[\u4FBF\u4FBF]",
      hk: "[\u4FBF\u4FBF]",
      us: "[Poop]",
      code: "/:shit",
      web_code: "/\u4FBF\u4FBF"
    },
    {
      position: {x: 8, y: 8},
      id: 96,
      cn: "[\u6708\u4EAE]",
      hk: "[\u6708\u4EAE]",
      us: "[Moon]",
      code: "/:moon",
      web_code: "/\u6708\u4EAE"
    },
    {
      position: {x: 9, y: 8},
      id: 97,
      cn: "[\u52FE\u5F15]",
      hk: "[\u52FE\u5F15]",
      us: "[Beckon]",
      code: "/:jj",
      web_code: "/\u52FE\u5F15"
    },
    {
      position: {x: 10, y: 8},
      id: 98,
      cn: "[\u5408\u5341]",
      emoji: "\u{1F64F}",
      hk: "",
      us: "",
      code: "\\ue41d",
      web_code: ""
    },
    {
      position: {x: 0, y: 9},
      id: 99,
      cn: "[\u62F3\u5934]",
      hk: "[\u62F3\u982D]",
      us: "[Fist]",
      code: "/:@@",
      web_code: "/\u62F3\u5934"
    },
    {
      position: {x: 1, y: 9},
      id: 100,
      cn: "[OK]",
      hk: "[OK]",
      us: "[OK]",
      code: "/:ok",
      web_code: "/OK"
    },
    {
      position: {x: 2, y: 9},
      id: 101,
      cn: "[\u5927\u54ED]",
      hk: "[\u5927\u54ED]",
      us: "[Cry]",
      code: '/::"(',
      web_code: "/\u5927\u54ED"
    },
    {
      position: {x: 3, y: 9},
      id: 102,
      cn: "[\u8DF3\u8DF3]",
      hk: "[\u8DF3\u8DF3]",
      us: "[Waddle]",
      code: "/:jump",
      web_code: "/\u8DF3\u8DF3"
    },
    {
      position: {x: 4, y: 9},
      id: 103,
      cn: "[\u53D1\u6296]",
      hk: "[\u767C\u6296]",
      us: "[Tremble]",
      code: "/:shake",
      web_code: "/\u53D1\u6296"
    },
    {
      position: {x: 5, y: 9},
      id: 104,
      cn: "[\u6004\u706B]",
      hk: "[\u5674\u706B]",
      us: "[Aaagh!]",
      code: "/:<O>",
      web_code: "/\u6004\u706B"
    },
    {
      position: {x: 6, y: 9},
      id: 105,
      cn: "[\u8F6C\u5708]",
      hk: "[\u8F49\u5708]",
      us: "[Twirl]",
      code: "/:circle",
      web_code: "/\u8F6C\u5708"
    },
    {
      position: {x: 7, y: 9},
      id: 106,
      cn: "[\u793C\u7269]",
      hk: "",
      us: "",
      code: "\\ue112",
      web_code: ""
    },
    {
      position: {x: 8, y: 9},
      id: 107,
      cn: "[\u5E86\u795D]",
      emoji: "\u{1F389}",
      hk: "",
      us: "",
      code: "\\ue312",
      web_code: ""
    },
    {
      position: {x: 9, y: 9},
      id: 108,
      cn: "[\u9B3C\u9B42]",
      emoji: "\u{1F47B}",
      hk: "",
      us: "",
      code: "\\ue11b",
      web_code: ""
    },
    {
      position: {x: 10, y: 9},
      id: 109,
      cn: "[\u6487\u5634]",
      hk: "[\u6487\u5634]",
      us: "[Grimace]",
      code: "/::~",
      web_code: "/\u6487\u5634"
    }
  ];
  function transform2KeyPosition(data) {
    let usedKeys = ["cn", "us", "code", "web_code"];
    let res = {};
    data.forEach((item) => {
      usedKeys.forEach((key) => {
        let trieKey = item[key];
        if (trieKey && trieKey !== "[]" && !(trieKey in res)) {
          res[trieKey] = item.position;
        }
      });
    });
    return res;
  }
  var EMOJI_KEY_POSITION = transform2KeyPosition(EMOJI_DATA);

  // src/utils/uitl.ts
  function stringSplice(str, index, count, addedStr) {
    return str.slice(0, index) + addedStr + str.slice(index + count);
  }

  // src/parser.ts
  var emojiKeys = Object.keys(EMOJI_KEY_POSITION);
  var trie = new trie_default(emojiKeys);
  var panelScaleCache = {};
  function calculateScaleAndBgSize(panel, emojiSize) {
    if (panelScaleCache[emojiSize])
      return panelScaleCache[emojiSize];
    let {width, x, paddingLeft, paddingRight, gapX} = panel;
    let originSize = (width - paddingLeft - paddingRight - gapX * (x - 1)) / x;
    let scale = emojiSize / originSize;
    let bgSize = +(width * scale).toFixed(2);
    panelScaleCache[emojiSize] = {scale, bgSize};
    return panelScaleCache[emojiSize];
  }
  function getEmojiStyle(position, emojiOption) {
    let {gapX, gapY} = EMOJI_PANEL;
    const emojiSize = emojiOption.size;
    const url = emojiOption.emojiSpriteUrl;
    let {scale, bgSize} = calculateScaleAndBgSize(EMOJI_PANEL, emojiSize);
    let bgPosition = "";
    if (position) {
      let {x, y} = position;
      let left = -(x * (emojiSize + scale * gapX)).toFixed(2);
      let top = -(y * (emojiSize + scale * gapY)).toFixed(2);
      bgPosition = `${left}px ${top}px`;
    }
    return {
      display: "inline-block",
      background: `url(${url}) no-repeat`,
      width: `${emojiSize}px`,
      height: `${emojiSize}px`,
      "background-position": `${bgPosition}`,
      "background-size": `${bgSize}px`
    };
  }
  function transform2Html(name, position, emojiOption) {
    const tag = emojiOption.tag;
    let style = "";
    let styleObj = getEmojiStyle(position, emojiOption);
    if (styleObj) {
      Object.keys(styleObj).forEach((key) => {
        styleObj[key] !== void 0 && (style += `${key}: ${styleObj[key]};`);
      });
    }
    return `<${tag} title="${name}" class="wx-emoji" style="${style}"></${tag}>`;
  }
  var defaultEmojiOption = {
    size: 64,
    tag: "a",
    emojiSpriteUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png"
  };
  function emojiParser(str) {
    if (!str)
      return str;
    let matchedEmoji = trie.search(str);
    matchedEmoji.reverse().map(([emojiIndex, keyIndex]) => {
      let name = emojiKeys[keyIndex], position = EMOJI_KEY_POSITION[name];
      let html = transform2Html(name, position, defaultEmojiOption);
      str = stringSplice(str, emojiIndex, name.length, html);
    });
    return str;
  }
  function configEmojiParser(option) {
    if (option) {
      Object.assign(defaultEmojiOption, option);
    }
  }

  // src/emoji.ts
  function getEmojisByEmojiData(emojiData) {
    return function(option) {
      let emojiOption = {
        size: 64,
        emojiSpriteUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png"
      };
      if (option) {
        emojiOption = Object.assign(emojiOption, option);
      }
      return emojiData.map(({position, code, cn}) => {
        let style = position && getEmojiStyle(position, emojiOption) || {};
        return {style, code, cn};
      });
    };
  }
  var getEmojis = getEmojisByEmojiData(EMOJI_DATA);
  return src_exports;
})();
