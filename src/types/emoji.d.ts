declare interface EmojiPanel {
  // emoji雪碧图的属性
  width: 724 // 图片宽度
  height: 658
  x: 11 // x轴表情数量
  y: 10 // y轴表情数量
  paddingTop: 0 // 面板内边距-上
  paddingBottom: 0 // 面板内边距-下
  paddingLeft: 0
  paddingRight: 0
  gapX: 6 // x 轴上两个表情之间的间距
  gapY: 6 // y 轴上两个表情之间的间距
}

declare interface EmojiData {
  // emoji雪碧图的表情位置及对应的code码
  id: number
  cn: string
  hk: string
  us: string
  code: string
  web_code: string
  emoji?: string
  position: { x: number; y: number }
}

declare interface EmojiParserOption {
  size?: number // emoji 大小，单位px 默认64
  tag?: string // 解析后的html标签，默认a
  emojiSpriteUrl?: string // 雪碧图文件路径
}
