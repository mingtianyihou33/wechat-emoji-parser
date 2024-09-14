declare interface EmojiData {
  cn: string
  hk: string
  us: string
  code: string
  web_code: string
  src: string
  emoji?: string
}

declare interface EmojiParserOption {
  size?: number // emoji 大小，单位px 默认64
  tag?: string // 解析后的html标签，默认a
}

declare interface EmojiStyle {
  display: string
  background: string
  width: string
  height: string
  'background-size': string
}

declare interface Emoji {
  code: string // emoji对应的编码，如：/:@>
  cn: string // 中文显示，如：[右哼哼]
  style: EmojiStyle
}
