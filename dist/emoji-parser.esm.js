function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * 字符查找树
 * @constructor
 */
var Trie = /*#__PURE__*/function () {
  function Trie(keyArr) {
    _classCallCheck(this, Trie);

    // 层级 0 代表顶层
    this.tier = 0; // 值为0代表没匹配到，为1表示匹配到了

    this.empty = 1; // 对应的哈希表中的索引

    this.index = 0;
    this.children = {};
    keyArr && this.build(keyArr);
  }

  _createClass(Trie, [{
    key: "build",
    value: function build(arr) {
      var len = arr.length;

      for (var i = 0; i < len; i++) {
        this.insert(arr[i], 0, i);
      }
    }
  }, {
    key: "insert",
    value: function insert(str) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var idx = arguments.length > 2 ? arguments[2] : undefined;

      if (str.length === 0) {
        return;
      }

      var T = this;
      var s;
      var child;

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
  }, {
    key: "searchOne",
    value: function searchOne(str) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var result = {};
      if (str.length === 0) return result;
      var T = this;
      var child;
      var s;
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
  }, {
    key: "search",
    value: function search(str) {
      if (this.empty == 1) return [];
      var len = str.length;
      var searchResult = [];
      var tmp;

      for (var i = 0; i < len - 1; i++) {
        tmp = this.searchOne(str, i);

        if (typeof tmp.arr !== 'undefined' && tmp.arr.length > 0) {
          searchResult.push(tmp.arr);
          i = i + tmp.tier - 1;
        }
      }

      return searchResult;
    }
  }]);

  return Trie;
}();

var emojiObj = {
	"/::)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif",
	"/::~": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif",
	"/::B": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/2.gif",
	"/::|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/3.gif",
	"/:8-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/4.gif",
	"/::<": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif",
	"/::$": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/6.gif",
	"/::X": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/7.gif",
	"/::Z": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/8.gif",
	"/::'(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/9.gif",
	"/::-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/10.gif",
	"/::@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/11.gif",
	"/::P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/12.gif",
	"/::D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/13.gif",
	"/::O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/14.gif",
	"/::(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/15.gif",
	"/::+": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/16.gif",
	"/:--b": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/17.gif",
	"/::Q": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/18.gif",
	"/::T": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/19.gif",
	"/:,@P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/20.gif",
	"/:,@-D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif",
	"/::d": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/22.gif",
	"/:,@o": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/23.gif",
	"/::g": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/24.gif",
	"/:|-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/25.gif",
	"/::!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/26.gif",
	"/::L": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/27.gif",
	"/::>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif",
	"/::,@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/29.gif",
	"/:,@f": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/30.gif",
	"/::-S": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/31.gif",
	"/:?": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/32.gif",
	"/:,@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/33.gif",
	"/:,@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/34.gif",
	"/::8": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif",
	"/:,@!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/36.gif",
	"/:!!!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/37.gif",
	"/:xx": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/38.gif",
	"/:bye": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/39.gif",
	"/:wipe": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/40.gif",
	"/:dig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/41.gif",
	"/:handclap": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/42.gif",
	"/:&-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/43.gif",
	"/:B-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif",
	"/:<@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/45.gif",
	"/:@>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/46.gif",
	"/::-O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/47.gif",
	"/:>-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/48.gif",
	"/:P-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/49.gif",
	"/::'|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/50.gif",
	"/:X-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/51.gif",
	"/::*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/52.gif",
	"/:@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/53.gif",
	"/:8*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/54.gif",
	"/:pd": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/55.gif",
	"/:<W>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/56.gif",
	"/:beer": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/57.gif",
	"/:basketb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif",
	"/:oo": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/59.gif",
	"/:coffee": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/60.gif",
	"/:eat": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/61.gif",
	"/:pig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/62.gif",
	"/:rose": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif",
	"/:fade": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/64.gif",
	"/:showlove": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif",
	"/:heart": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif",
	"/:break": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/67.gif",
	"/:cake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/68.gif",
	"/:li": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif",
	"/:bome": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/70.gif",
	"/:kn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/71.gif",
	"/:footb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/72.gif",
	"/:ladybug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/73.gif",
	"/:shit": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/74.gif",
	"/:moon": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/75.gif",
	"/:sun": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/76.gif",
	"/:gift": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/77.gif",
	"/:hug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/78.gif",
	"/:strong": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif",
	"/:weak": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/80.gif",
	"/:share": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif",
	"/:v": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/82.gif",
	"/:@)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif",
	"/:jj": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/84.gif",
	"/:@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/85.gif",
	"/:bad": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/86.gif",
	"/:lvu": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/87.gif",
	"/:no": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/88.gif",
	"/:ok": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/89.gif",
	"/:love": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/90.gif",
	"/:<L>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/91.gif",
	"/:jump": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/92.gif",
	"/:shake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/93.gif",
	"/:<O>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/94.gif",
	"/:circle": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/95.gif",
	"/:kotow": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/96.gif",
	"/:turn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/97.gif",
	"/:skip": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/98.gif",
	"/:oY": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/99.gif",
	":smile:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 3
	}
},
	":mask:": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 1
	}
},
	":joy:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 2
	}
},
	":stuck_out_tongue_closed_eyes:": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 4
	}
},
	":flushed:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 8
	}
},
	":scream:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 7
	}
},
	":pensive:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 5
	}
},
	":unamused:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 4
	}
},
	"[Hey]": {
	panel: "b5bd1fe0",
	position: {
		col: 8,
		row: 7
	}
},
	"[Smirk]": {
	panel: "b5bd1fe0",
	position: {
		col: 2,
		row: 1
	}
},
	"[Smart]": {
	panel: "b5bd1fe0",
	position: {
		col: 2,
		row: 2
	}
},
	"[Concerned]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 3
	}
},
	"[Yeah!]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 2
	}
},
	":ghost:": {
	panel: "b5bd1fe0",
	position: {
		col: 10,
		row: 10
	}
},
	":pray:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 9
	}
},
	":muscle:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 1
	}
},
	":tada:": {
	panel: "b5bd1fe0",
	position: {
		col: 9,
		row: 10
	}
},
	":gift:": {
	panel: "b5bd1fe0",
	position: {
		col: 8,
		row: 10
	}
},
	"[Packet]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 1
	}
},
	"[好的]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 5
	}
},
	"[加油]": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 6
	}
},
	"[汗]": {
	panel: "b5bd1fe0",
	position: {
		col: 5,
		row: 6
	}
},
	"[天啊]": {
	panel: "b5bd1fe0",
	position: {
		col: 6,
		row: 6
	}
},
	"[Emm]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 1
	}
},
	"[社会社会]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 2
	}
},
	"[旺柴]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 3
	}
},
	"[加油加油]": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 6
	}
},
	"[吃瓜]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 6
	}
},
	"[Facepalm]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 2
	}
},
	"[哇]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 7
	}
},
	"[打脸]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 6
	}
},
	"[囧]": {
	panel: "b5bd1fe0",
	position: {
		col: 5,
		row: 1
	}
}
};

var b5bd1fe0 = {
	url: "https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png",
	width: 724,
	height: 658,
	col: 11,
	row: 10,
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	gapCol: 6,
	gapRow: 6
};
var emojiPanel = {
	b5bd1fe0: b5bd1fe0,
	"6AfH8": {
	url: "https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png",
	width: 480,
	height: 380,
	col: 15,
	row: 12,
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	gapCol: 6,
	gapRow: 6
}
};

var emojiKeys = Object.keys(emojiObj);
var trie = new Trie(emojiKeys);
var emojiWidth = 24,
    emojiHeight = 24;
var panelInfoCache = {};

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

function calculatePanelInfo(panelId, panel) {
  var url = panel.url,
      width = panel.width,
      height = panel.height,
      col = panel.col,
      row = panel.row,
      paddingTop = panel.paddingTop,
      paddingBottom = panel.paddingBottom,
      paddingLeft = panel.paddingLeft,
      paddingRight = panel.paddingRight,
      gapCol = panel.gapCol,
      gapRow = panel.gapRow;
  if (!url) return ''; // 计算背景宽度应该缩放到多少
  // 原图的emojiWidth

  var imgEmojiWidth = (width - paddingLeft - paddingRight - gapCol * (col - 1)) / col; // bgWidth / width = emojiWidth / imgEmojiWidth 比例是相等的

  var scale = emojiWidth / imgEmojiWidth;
  var bgWidth = width * scale;
  panelInfoCache[panelId] = {
    scale: scale,
    bgWidth: bgWidth
  };
  return panelInfoCache[panelId];
}

function getPanelEmojiTemplate(title, position, panelId) {
  var panel = emojiPanel[panelId];
  var url = panel.url,
      gapCol = panel.gapCol,
      gapRow = panel.gapRow;
  if (!url) return '';

  var _ref = panelInfoCache[panelId] || calculatePanelInfo(panelId, panel),
      scale = _ref.scale,
      bgWidth = _ref.bgWidth;

  if (_typeof(position) === 'object') {
    var _position = position,
        targetCol = _position.col,
        targetRow = _position.row;
    var left = -(targetCol - 1) * (emojiWidth + scale * gapCol);
    var top = -(targetRow - 1) * (emojiHeight + scale * gapRow);
    position = "".concat(left, "px ").concat(top, "px");
  }

  return "<a title=\"".concat(title, "\" style=\"display: inline-block;background: url(").concat(url, ") no-repeat;width: ").concat(emojiWidth, "px;\n    height: ").concat(emojiHeight, "px; background-position:").concat(position, "; background-size: ").concat(bgWidth, "px;\"></a>");
}

function emojiParser(str) {
  var matchedEmoji = trie.search(str);
  matchedEmoji.reverse().map(function (idx) {
    var pos = idx[0],
        emotion = emojiKeys[idx[1]],
        emotionValue = emojiObj[emotion];
    var img = _typeof(emotionValue) === 'object' ? getPanelEmojiTemplate(emotion, emotionValue.position, emotionValue.panel) : emotionValue.indexOf('http') !== -1 ? '<img src="' + emotionValue + '" alt="' + emotion + '">' : emotionValue;
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}

export default emojiParser;
