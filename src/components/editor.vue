<template>
  <div>
    <div class="processor">
      <codemirror class="code-mirror-pane" ref="myCm"
      v-model="content" 
      @input="update"
      :options="codeMirrorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/idea.css"
import "codemirror/theme/elegant.css"
import "codemirror/theme/mdn-like.css"
import "codemirror/theme/eclipse.css"
import "codemirror/addon/fold/foldgutter.css"
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
        mode: {name: "javascript", json: true},
        theme: this.codeMirrorTheme,
        lineNumbers: true,
        lineWrapping: true,
        moveOnDrag: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {"Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }},
      }
    }
  },
  methods: {
    update(val) {
      console.log('inside update input event')
      this.$emit('updated', val);
    },
  },
  components: {
    codemirror
  }
}
</script>

<style>
.processor {
  padding: 15px;
  margin: 20px 10px 20px 20px;
  resize: horizontal;
  border-radius: 13px;
  background: #E1E4F0;
  box-shadow: inset 5px 5px 10px #c4c6d1,
  inset -5px -5px 10px #feffff;
}

.code-mirror-pane {
  text-align:left
}

.CodeMirror {
  height: 100vh !important;
}
</style>
