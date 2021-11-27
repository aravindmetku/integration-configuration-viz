<template>
  <div id="app">
    <app-bar @updateTitle="onNewTitle"></app-bar>
    <div class="content">
      <div style="width:50%;border:2px;">
        <div class="stats-action">
          <stats :processorsData="displayData"></stats>
          <action :selectedEditorDisplayToggle="selectedEditorDisplayToggle" @toggled="onToggled"></action>
        </div>
        <editor :content="displayDataStr"
                :codeMirrorTheme="codeMirrorTheme"
                @updated="updatedContent"
        ></editor>
        <span v-if="fileHandlerManager.fileName" class="fileSync">
          Last Synced {{fileHandlerManager.fileName}} at {{fileHandlerManager.lastUpdatedAt}} ({{ fileHandlerManager.updateStatus }})
        </span>
        <span v-else class="fileSync" @click="createFileHandlerForSession">
          {{ fileHandlerManager.updateStatus }}
        </span>
      </div>
      <div class="resizer" ref="dragMe"></div>
      <div style="flex: 1 1 0">
        <cardWrapper :data="pr" @click="processorClicked"
                     @onFindVariableUsageClicked="processorVariableClickedForUsages"
                     :selectedProcessorIndex="selectedProcessorIndex"
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

function findLeavesOfJson(json) {
  if (!json) {
    return []
  }
  const allLeaves = []

  function find(o, res) {
    if (typeof o === "string") {
      res.push(o)
      return
    }
    Object.values(o).forEach(v => find(v, res))
  }

  find(json, allLeaves)
  return allLeaves
}

async function open(pickerOpts) {
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  if (fileHandle.kind !== 'file') {
    console.error("Select a file")
    return;
  }

  return fileHandle;
}

async function writeToFile(fileHandler, fileHandlerManager, content) {
  if (!fileHandler) {
    console.error("No file is selected.")
    return;
  }
  try {
    const writableStream = await fileHandler.createWritable();
    await writableStream.write(content);
    await writableStream.close();
    fileHandlerManager.lastUpdatedAt = new Date().toISOString();
    fileHandlerManager.updateStatus = 'file in Sync!'
  } catch (e) {
    console.log(e);
    fileHandlerManager.updateStatus = 'failed to save to the file. Beware loss of data!'
  }
}

// not exact - this is basic string matching
const isVariableUsedInExpr = variableKey => s => {
  // sanitized variable key strings - remove dynamic parts
  const vk = variableKey.split(/\${[^}]+}/gm).filter(Boolean);
  const variableUsageSyntax = /variables[.|[](.+?)$|]]/gm;
  for (const sanitizedVar of vk) {
    let match = variableUsageSyntax.exec(s)
    while (match != null) {
      let isMatched = match[1].includes(sanitizedVar)
      if (isMatched) {
        return true
      }
      match = variableUsageSyntax.exec(s)
    }
  }
  return false
}


let fileHandler;

export default {
  name: 'App',
  data: function () {
    return {
      codeDisplayStr: '{"processors":[{"processorType":"inboundFactSheet","processorName":"Apps from Deployments","processorDescription":"creates Process FS from gives LDIF","run":1,"variables":[{"key":"app_variable","value":"${lx.relations.size()}"}]},{"processorType":"inboundFactSheet","processorName":"Updates description","processorDescription":"Updates description","run":2,"updates":[{"key":{"expr":"description"},"values":[{"expr":"Relations size is : ${variables[\'app_variable\']}"}]}]}]}',
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
      leftWidth: 0,
      variableUsageHighlightProcessors: {
        initiatorProcessorGlobalIdx: null,
        status: {},
        variableKey: null
      },
      fileHandlerManager: {
        fileName: null,
        updateStatus: 'click here to select Integration API JSON file!',
        lastUpdatedAt: 'never'
      },
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
        return 'elegant';
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
        acc[curr.run].push({
          pr: curr,
          prErrors: errors[curr.processorName] ?? [],
          globalIdx: i,
          selectedVarInUsage: {
            isUsed: this.variableUsageHighlightProcessors.status[curr.processorName] ?? false,
            initiatorProcessorGlobalIdx: this.variableUsageHighlightProcessors.initiatorProcessorGlobalIdx,
            variableKey: this.variableUsageHighlightProcessors.variableKey,
          }
        });
        return acc;
      }, {})
      return Object.entries(v);
    }
  },
  methods: {
    async createFileHandlerForSession() {
      const pickerOpts = {
        types: [
          {
            description: 'Json',
            accept: {
              'json/*': ['.json']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false
      };

      fileHandler = await open(pickerOpts);
      this.fileHandlerManager.updateStatus = 'file selected';
      this.fileHandlerManager.fileName = fileHandler.name;
      const file = await fileHandler.getFile();
      this.codeDisplayStr = await file.text();
    },
    onNewTitle(val) {
      document.title = val ? `${val} | Integration Visualiser` : 'Integration Visualiser'
    },
    updatedContent(val) {
      if (this.selectedEditorDisplayToggle === 'PROCESSOR') {
        const current = [...this.displayData];
        current[this.selectedProcessorIndex] = JSON.parse(val).processor;
        let parse = JSON.parse(this.codeDisplayStr);
        parse.processors = current;
        this.codeDisplayStr = JSON.stringify(parse);
      } else if (this.selectedEditorDisplayToggle === 'CONNECTOR') {
        this.codeDisplayStr = val;
        writeToFile(fileHandler, this.fileHandlerManager, val).then(() => console.log('Saved to file!'));
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
    },
    processorVariableClickedForUsages({initProcessorIdx, variableKey}) {
      if (this.variableUsageHighlightProcessors.initiatorProcessorGlobalIdx === initProcessorIdx
          && this.variableUsageHighlightProcessors.variableKey === variableKey) {
        // reset
        this.variableUsageHighlightProcessors = {
          status: {},
          variableKey: null,
          initiatorProcessorGlobalIdx: null
        }
        return;
      }

      console.log('find var usages', variableKey)
      let resetVarHighlightProcessors = this.groupedProcessors
          .flatMap(x => x[1])
          .map(gPr => {
            gPr.selectedVarInUsage = false
            return gPr
          });
      const _isVariableUsedInString = isVariableUsedInExpr(variableKey)
      const usedInProcessors = resetVarHighlightProcessors
          .filter(gPr => gPr.globalIdx !== initProcessorIdx)
          .filter(gPr => {
            return !!findLeavesOfJson(gPr).find(_isVariableUsedInString)
          })
          .reduce((acc, gPr) => {
            acc[gPr.pr.processorName] = true
            return acc;
          }, {});

      this.variableUsageHighlightProcessors = {
        status: usedInProcessors,
        variableKey,
        initiatorProcessorGlobalIdx: initProcessorIdx
      }
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
  font-family: 'Axiforma Regular', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 50px auto;
}

.content {
  display: flex;
  background-color: #F0F1F7;
}

.resizer {
  margin: auto 5px;
  height: 100px;
  width: 10px;
  border-radius: 29px;
  background: #E1E4F0;
  box-shadow: inset 8px 8px 16px #d1d4df,
  inset -8px -8px 16px #f1f4ff;
}

.stats-action {
  padding: 20px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 5%;
  margin-top: 20px;
}

.fileSync {
  margin-left: 20px;
  font-size: smaller;
  opacity: 0.5;
  cursor: pointer;
}

@font-face {
  font-family: 'Axiforma Regular';
  font-style: normal;
  font-weight: normal;
  src: local('Axiforma Regular'), url('assets/font/Kastelov  Axiforma Regular.woff') format('woff');
}
</style>
