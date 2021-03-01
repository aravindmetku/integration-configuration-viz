<template>
  <div>
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

.CodeMirror {
  height: 100vh !important;
  overflow: auto !important;
}
</style>
