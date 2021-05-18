<template>
  <div id="app">
    <app-bar></app-bar>
    <div class="content">
      <div style="width:50%;border:2px;">
        <stats :processorsData="displayData"></stats>
        <action @toggled="onToggled"></action>
        <editor :content="displayDataStr"
                :codeMirrorTheme="codeMirrorTheme"
                @updated="updatedContent"
        ></editor>
      </div>
      <div class="resizer" ref="dragMe"></div>
      <div style="flex: 1 1 0">
        <cardWrapper :data="pr" @click="processorClicked"
                     v-for="(pr, idx) in groupedProcessors" v-bind:key="idx"></cardWrapper>
      </div>
    </div>
  </div>
</template>


<script>
import editor from './components/editor.vue'
import Stats from "@/components/stats";
import Action from "@/components/action";
import cardWrapper from "@/components/card-wrapper"
import AppBar from "@/components/app-bar";

function compare(a, b) {
  if (a.run < b.run) {
    return -1;
  }
  if (a.run > b.run) {
    return 1;
  }
  return 0;
}

function displayErrorData(errorDisplayStr) {
  try {
    return JSON.parse(errorDisplayStr).warnings.reduce((acc, curr) => {
      if (!acc[curr.processor.name]) {
        acc[curr.processor.name] = []
      }
      acc[curr.processor.name].push(curr?.detail?.message ?? curr.message);
      return acc;
    }, {});
  } catch (e) {
    return []
  }
}

export default {
  name: 'App',
  data: function () {
    return {
      codeDisplayStr: '{"processors": [{"processorType": "inboundFactSheet","processorName": "Apps from Deployments","processorDescription": "creates Process FS from gives LDIF", "run": 1}]}',
      errorDisplayStr: `{
                            "results": null,
                            "warnings": [
                                {
                                    "processor": {
                                        "name": "Apps from Deployments",
                                        "index": -1
                                    },
                                    "message": "Impacts does not support simulation mode. Skipping full sync deletion for impacts",
                                    "category": "fullSyncDeletion",
                                    "status": "WARNING"
                                }]}`,
      processorDisplayStr: '',
      selectedProcessorIndex: 0,
      selectedEditorDisplayToggle: 'CONNECTOR',
      cmOptions: {
        tabSize: 2,
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        lineWraping: true
      },
      resizer: null,
      x: 0,
      leftSide: 0,
      rightSide: 0,
      leftWidth: 0
    }
  },
  computed: {
    displayData: function () {
      try {
        return JSON.parse(this.codeDisplayStr).processors.sort(compare)
      } catch (e) {
        return []
      }
    },
    codeMirrorTheme: function () {
      if (this.selectedEditorDisplayToggle === 'CONNECTOR') {
        return 'idea';
      } else if (this.selectedEditorDisplayToggle === 'PROCESSOR') {
        return 'eclipse';
      } else {
        return 'mdn-like';
      }
    },
    displayDataStr: function () {
      if (this.selectedEditorDisplayToggle === 'CONNECTOR') {
        return JSON.stringify(JSON.parse(this.codeDisplayStr), null, 2);
      } else if (this.selectedEditorDisplayToggle === 'PROCESSOR') {
        const p = {
          errors: displayErrorData(this.errorDisplayStr)[this.displayData[this.selectedProcessorIndex].processorName],
          processor: this.displayData[this.selectedProcessorIndex]
        }
        return JSON.stringify(p, null, 2);
      } else {
        try {
          return JSON.stringify(JSON.parse(this.errorDisplayStr), null, 2)
        } catch (e) {
          return this.errorDisplayStr;
        }
      }
    },
    groupedProcessors: function () {
      const errors = displayErrorData(this.errorDisplayStr);
      const v = this.displayData.reduce((acc, curr, i) => {
        if (!acc[curr.run]) {
          acc[curr.run] = []
        }
        acc[curr.run].push({pr: curr, prErrors: errors[curr.processorName] ?? [], globalIdx: i});
        return acc;
      }, {})
      return Object.entries(v);
    }
  },
  methods: {
    updatedContent(val) {
      if (this.selectedEditorDisplayToggle === 'PROCESSOR') {
        const current = [...this.displayData];
        current[this.selectedProcessorIndex] = JSON.parse(val).processor;
        let parse = JSON.parse(this.codeDisplayStr);
        parse.processors = current;
        this.codeDisplayStr = JSON.stringify(parse);
      } else if (this.selectedEditorDisplayToggle === 'CONNECTOR') {
        this.codeDisplayStr = val;
      } else {
        this.errorDisplayStr = val;
      }
    },
    onToggled: function (val) {
      this.selectedEditorDisplayToggle = val;
    },

    mouseDownHandler(e) {
      // Get the current mouse position
      this.x = e.clientX;
      // y = e.clientY;
      this.leftWidth = this.leftSide.getBoundingClientRect().width;

      // Attach the listeners to `document`
      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('mouseup', this.mouseUpHandler);
    },
    mouseMoveHandler(e) {
      // How far the mouse has been moved
      const dx = e.clientX - this.x;
      // const dy = e.clientY - y;

      const newLeftWidth = (this.leftWidth + dx) * 100 / this.resizer.parentNode.getBoundingClientRect().width;
      this.leftSide.style.width = `${newLeftWidth}%`;
      document.body.style.cursor = 'col-resize';
      this.leftSide.style.userSelect = 'none';
      this.leftSide.style.pointerEvents = 'none';

      this.rightSide.style.userSelect = 'none';
      this.rightSide.style.pointerEvents = 'none';
    },
    mouseUpHandler() {
      this.resizer.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');

      this.leftSide.style.removeProperty('user-select');
      this.leftSide.style.removeProperty('pointer-events');

      this.rightSide.style.removeProperty('user-select');
      this.rightSide.style.removeProperty('pointer-events');

      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    },
    processorClicked(event) {
      this.selectedProcessorIndex = event.idx;
      this.selectedEditorDisplayToggle = 'PROCESSOR';
    }
  },
  components: {
    AppBar,
    Action,
    Stats,
    editor,
    cardWrapper
  },
  created() {

  },
  mounted() {
    this.resizer = this.$refs.dragMe
    console.log('inside resizer ', this.resizer)
    this.leftSide = this.resizer.previousElementSibling;
    this.rightSide = this.resizer.nextElementSibling;
    this.x = 0;
    this.resizer.addEventListener('mousedown', this.mouseDownHandler);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 50px auto;
}

.content {
  display: flex;
}

.resizer {
  height: 100vh;
  width: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #eaeaea;
}

</style>
