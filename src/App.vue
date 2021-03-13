<template>
  <div id="app">
    <!-- <h3 style="margin-top:2px">Integration Processors Viz</h3> -->
    <div style="width:50%;border:2px;">
      <stats :processorsData="displayData"></stats>
      <action @toggled="onToggled"></action>
      <editor :content="displayDataStr"
              @updated="updatedContent"
      ></editor>
    </div>
    <div class="resizer" style="height:100vh; width:10px; background-color:#eaeaea" ref="dragMe"></div>
    <div style="flex: 1 1 0">
      Right
      <card v-for="p in displayData" v-bind:key="p.processorName" :processor="p"></card>
    </div>
  </div>
</template>


<script>
import editor from './components/editor.vue'
import card from './components/card.vue'
import Stats from "@/components/stats";
import Action from "@/components/action";

function compare(a, b) {
  if (a.run < b.run) {
    return -1;
  }
  if (a.run > b.run) {
    return 1;
  }
  return 0;
}

export default {
  name: 'App',
  data: function () {
    return {
      value: 'console.log("Hello, World");',
      codeDisplayStr: '{"connectorType": "LeanIX-BPM-Integration-Inbound","connectorId": "LeanIX-BPM-Integration-Inbound","connectorVersion": "1.0.0","processingDirection": "inbound","processingMode": "partial","readOnly": false,"processors": [{"processorType": "inboundFactSheet","processorName": "Apps from Deployments","processorDescription": "creates Process FS from gives LDIF", "run": 1}]}',
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
        console.log(JSON.parse(this.codeDisplayStr).processors.sort(compare))
        return JSON.parse(this.codeDisplayStr).processors.sort(compare)
      } catch (e) {
        return []
      }
    },
    displayDataStr: function () {
      console.log('selected toggle option', this.selectedEditorDisplayToggle, this.selectedProcessorIndex);
      if (this.selectedEditorDisplayToggle === 'CONNECTOR') {
        return JSON.stringify(JSON.parse(this.codeDisplayStr), null, 2);
      } else {
        const processors = JSON.parse(this.codeDisplayStr).processors;
        return JSON.stringify(processors[this.selectedProcessorIndex], null, 2);
      }
    }
  },
  methods: {
    updatedContent(val) {
      console.log('code is updated')
      if(this.selectedEditorDisplayToggle === 'PROCESSOR') {
        const current = [...this.displayData];
        current[this.selectedProcessorIndex] = JSON.parse(val);
        let parse = JSON.parse(this.codeDisplayStr);
        console.log('line 85 the parse is ', parse)
        parse.processors = current;
        this.codeDisplayStr = JSON.stringify(parse);
      } else {
        this.codeDisplayStr = val;
      }
    },
    onToggled: function (val) {
      this.selectedEditorDisplayToggle = val;
    },
    updateSource(value) {
      console.log('update the source now');
      const current = [...this.displayData];
      const updated = current.findIndex(p => p.processorName === value.processorName);
      current[updated] = value;

      let parse = JSON.parse(this.codeDisplayStr);
      parse.processors = current;
      this.codeDisplayStr = JSON.stringify(parse);
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
    }
  },
  components: {
    Action,
    Stats,
    editor,
    card
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
  text-align: center;
  color: #2c3e50;
  margin-top: 1vh;
  display: flex
}

.processorsContainer {
  display: grid;
}
</style>
