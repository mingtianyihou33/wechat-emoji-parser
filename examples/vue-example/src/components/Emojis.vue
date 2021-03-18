<template>
  <div class="wrap">
    <div class="emoji-container">
      <h3>表情列表</h3>
      <div class="emoji-content">
        <template v-for="emoji in emojis" :key="emoji.code">
          <a
            :title="emoji.cn"
            :style="emoji.style"
            @click="selectEmoji(emoji.cn)"
          ></a>
        </template>
      </div>
    </div>
    <div class="emoji-out">
      <h3>输入内容进行转换：</h3>
      <input class="emoji-input" :value="inputVal" @input="inputChange" />
      <button class="btn" @click="transform">转换为表情</button>
      <h3>输出：</h3>
      <p class="emoji-output" v-html="outputVal"></p>
    </div>
  </div>
</template>

<script setup>
import {
  getEmojis,
  emojiParser,
  configEmojiParser,
} from '../../../../dist/emoji-parser.esm'
import { reactive, ref } from 'vue'

const emojis = reactive(getEmojis({ size: 50 }))
const inputVal = ref('')
const outputVal = ref('')

function inputChange(e) {
  inputVal.value = e.target.value
}
function selectEmoji(emojiStr) {
  inputVal.value += emojiStr
}

configEmojiParser({ size: 30 })
function transform() {
  outputVal.value = emojiParser(inputVal.value)
}
</script>

<style scoped>
.wrap {
  display: flex;
}
.emoji-container {
  display: inline-block;
  text-align: center;
  margin-left: 20px;
}

.emoji-content {
  display: inline-block;
  width: 500px;
  max-height: 500px;
  overflow: auto;
  border: 1px solid yellowgreen;
}

.emoji-out {
  display: inline-block;
  margin-left: 20px;
}
.emoji-input {
  width: 200px;
  height: 20px;
}
.emoji-output {
  max-height: 500px;
  border: 1px solid yellowgreen;
  padding: 20px;
}
.btn {
  margin-left: 10px;
}
</style>
