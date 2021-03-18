# wechat-emoji-parser

微信表情转换，可用于公众号接收用户表情消息，将表情转换为相应的图片

## install（安装）

npm:

```
    npm install wechat-emoji-parser -S
```

yarn:

```
    yarn add wechat-emoji-parser
```

## How to use

```
   import emojiParser from 'wechat-emoji-parser'
   // 直接调用解析即可
   let emojiStr = emojiParser(str)
```

## 添加更多表情

- src/config/emoji.json
  添加表情链接到改文件，如：
  ```
  "/::)":"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif"
  ```
- 或者添加表情面板(src/config/emojiPanel.json)
  然后在 emoji.json 中指出表情使用的面板名称和图标位置

### emojiPanel.json API

| 字段名        | 描述                   | 取值   |
| ------------- | ---------------------- | ------ |
| url           | emoji 图片地址         | string |
| width         | 图片的宽度             | number |
| height        | 图片的高度             | number |
| col           | 一行有多少个表情       | number |
| row           | 一列有多少个表情       | number |
| paddingTop    | 图片上面空白区域的高度 | number |
| paddingBottom | 图片下面空白区域的高度 | number |
| paddingLeft   | 图片左边空白区域的宽度 | number |
| paddingRight  | 图片右边空白区域的宽度 | number |
| gapCol        | 表情列与列之间的间距   | number |
| gapRow        | 表情行与行之间的间距   | number |

## 欢迎大家补充更多表情
