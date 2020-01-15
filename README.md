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
  然后在emoji.json中指出表情使用的面板名称和位置

## 欢迎大家补充更多表情
