<template>
  <div>
    <div class="radio-toggles">
      <input type="radio" id="option-1" name="radio-options">
      <label for="option-1" class="left-label">Connector</label>
      <input type="radio" id="option-2" name="radio-options" checked>
      <label for="option-2" class="right-label">Processor</label>
      <div class="slide-item"></div>
    </div>
    <div class="flex-strip" style="background-color:#7942a8;height:4.5vh; margin: 2vh 1vw">
      <span class="purple-strip-border"
            style="color:#fff; padding: 0.4vw; font-size:0.8rem; border-left: 0.05vw; boder-color: #fff">Total Processors Count : 12 </span>
      <span class="purple-strip-border" style="color:#fff; padding: 0.4vw; font-size:0.8rem"> Highest Run Index : 4 </span>
      <span class="purple-strip-border" style="color:#fff; padding: 0.4vw; font-size:0.8rem"> Last Updated : 12:44pm </span>
    </div>
    <div class="processor">
      <codemirror style="text-align:left" ref="myCm" v-model="this.content" :options="codeMirrorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/idea.css"
import {codemirror} from 'vue-codemirror'

require("codemirror/mode/javascript/javascript.js")
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')

export default {
  name: 'editor',
  data: function () {
    return {
      options: {
        mode: 'code'
      },
    }
  },
  props: {
     content: String
  },
  computed: {
    id() {
      return this.p.processorName;
    },
    codeMirrorOptions() {
      return {
        tabSize: 2,
        mode: 'javascript',
        theme: 'idea',
        lineNumbers: true,
        lineWraping: true,
        moveOnDrag: true
      }
    }
  },
  methods: {
    onError() {
      console.log('error')
    },
    showEditor() {
      this.$modal.show(`editor-${this.id}`)
    },
    onEditorClosed() {
      // console.log('update the main displaystr now' );
      // console.log(this.data)
      this.$emit('input', this.data)
    }
  },
  components: {
    codemirror
  }
}
</script>

<style>
.processor {
  border: grey solid 1px;
  padding: 0vw;
  margin: 2vh 1vw;
  resize: horizontal;
  height: 99vh;
}

.purple-strip-border {
  border-left: white solid 1px;
}

.flex-strip {
  display: flex;
  justify-content: right;

}

.CodeMirror {
  height: 100vh !important;
  overflow: auto !important;
}


.radio-toggles {
  align-items: center;
  background: black;
  border: 1px solid #000;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  margin: left;
  margin-left: 1vw;
  margin-top: 1vh;
  max-width: 12vw;
  overflow: hidden;
  padding: 0.5vh;
  position: relative;
}

label {
  cursor: pointer;
  padding: 0.2vh 0.5vw;
  font-size: 0.8rem;
  width: 6vw;
  z-index: 2;
  color: #fff
}

.left-label {
  text-align: left;
}

.right-label {
  text-align: right;
}

.slide-item {
  background: #3b444b;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  height: calc(100% - 0.5vh);
  left: calc(50% + 4px);
  position: absolute;
  width: calc(50% - 0.2vw);
  transition: left .4s;
  z-index: 0;
}

input[type="radio"] {
  left: -9999px;
  position: absolute;
  z-index: -1;
}

input[type="radio"]:nth-of-type(1):checked ~ .slide-item {
  left: 4px;
}

input[type="radio"]:nth-of-type(2):checked ~ .slide-item {
  left: calc(50% + 4px);
}
</style>
