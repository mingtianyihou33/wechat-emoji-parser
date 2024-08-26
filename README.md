# wechat-emoji-parser

微信表情解析工具，可以实现表情解析和表情发送功能

- 可用于公众号接收用户表情消息，将表情码转换为对应的表情 html 内容
- 还可以获取聊天表情，可以应用于聊天应用的表情

## install（安装）

npm:

```bash
npm install wechat-emoji-parser -S
```

yarn:

```bash
yarn add wechat-emoji-parser
```

## How to use（使用）

#### getEmojis(option)：获取表情

```js
import { getEmojis } from 'wechat-emoji-parser'
let emojis = getEmojis({ size: 24 })
/*emojis
[
  {
    cn: "[右哼哼]"
    code: "/:@>"
    style:{
            background: "url(...) no-repeat"
            background-position: "0px 0px"
            background-size: "599.7px"
            display: "inline-block"
            height: "50px"
            width: "50px"
	}
....
]
*/
```

1. 输入：option: {size: number, emojiSpriteUrl: string}

   | 属性名         | 类型   | 默认值                                                                | 说明                                                                                                                 |
   | -------------- | ------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
   | size           | number | 64                                                                    | emoji 大小，单位 px                                                                                                  |
   | emojiSpriteUrl | string | ./src/assets/emoji-sprite.png |  |

2. 输出 emojis: [
   {
   code: string,
   cn: string,
   style: {
   ​ display: string
   ​ background: string
   ​ width: string
   ​ height: string
   ​ 'background-position': string
   ​ 'background-size': string
   }

}]

| 属性名 | 类型   | 默认值 | 说明                       |
| ------ | ------ | ------ | -------------------------- |
| code   | string |        | emoji 对应的编码，如：/:@> |
| cn     | string |        | 中文显示，如：[右哼哼]     |
| style  | Object |        |                            |

#### parseEmoji(str) 解析表情

```js
import { parseEmoji, configParseEmoji } from 'wechat-emoji-parser'
configParseEmoji({ size: 30 }) // 设置一些参数
const res = parseEmoji('哈哈[西瓜]') // 解析文本
```

- configParseEmoji(option: object) 配置解析规则

  | 属性名         | 类型   | 默认值                                                                | 说明                                                                                                                 |
  | -------------- | ------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
  | size           | number | 64                                                                    | emoji 大小，单位 px                                                                                                  |
  | emojiSpriteUrl | string | ./src/assets/emoji-sprite.png |  |
  | tag            | string | 'a'                                                                   | 解析后的 html 标签                                                                                                   |

- parseEmoji(str: string)

  输入：待解析的文本

  输出：解析后的内容

### example

- [vue 项目使用案例](./examples/vue-example)
