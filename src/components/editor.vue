<template>
  <div>
    <div class="processor">
      <codemirror style="text-align:left" ref="myCm"
      v-model="content" 
      @input="update"
      :options="codeMirrorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/idea.css"
import "codemirror/theme/moxer.css"
import "codemirror/theme/zenburn.css"
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
     content: String,
     codeMirrorTheme: String
  },
  computed: {
    id() {
      return this.p.processorName;
    },
    codeMirrorOptions() {
      return {
        tabSize: 2,
        mode: 'javascript',
        theme: this.codeMirrorTheme,
        lineNumbers: true,
        lineWraping: true,
        moveOnDrag: true
      }
    }
  },
  methods: {
    update(val) {
      console.log('inside update input event')
      this.$emit('updated', val);
    },
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
  padding: 20px;
  margin: 20px 10px 20px 20px;
  resize: horizontal;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: inset 13px 13px 29px #e3e3e3,
  inset -13px -13px 29px #ffffff;
}

.CodeMirror {
  height: 100vh !important;
}
</style>
