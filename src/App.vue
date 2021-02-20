<template>
  <div id="app">
    <!-- <h3 style="margin-top:2px">Integration Processors Viz</h3> -->
     <div style="width:50%;border:2px;">
      <editor></editor>
    </div>
    <div class="resizer" style="height:100vh; width:10px; background-color:#eaeaea" ref="dragMe"></div>
    <div style="flex: 1 1 0%">
    Right<card :processor= "myProcessors"></card>
    </div>
  </div>
</template>


<script>
import editor from './components/editor.vue'
import card from './components/card.vue'

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
     displayDataStr: 'test',
     item: {
       content: 'console.log(here is a console log)'
     },
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
     leftWidth: 0,
     myProcessors: {
      run: 0,
      name: "First Processor",
      type: "inBound FS",
      description: "This is the inbound fs processor"
     }
    }
  },
  computed: {
    displayData: function () {
      try {
        return JSON.parse(this.displayDataStr).processors.sort(compare)
      } catch (e) {
        return []
      }
    }
  },
  methods: {
    updateSource(value) {
      console.log('update the source now');
      const current = [...this.displayData];
      const updated = current.findIndex(p => p.processorName === value.processorName);
      current[updated] = value;

      let parse = JSON.parse(this.displayDataStr);
      parse.processors = current;
      this.displayDataStr = JSON.stringify(parse);
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
