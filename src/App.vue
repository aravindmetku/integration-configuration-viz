<template>
  <div id="app">
    <h3>Integration Processors Viz</h3>
    <label>
      <textarea v-model="displayDataStr"
                placeholder="paste integration api"
                rows="5"
      ></textarea>
    </label>
      <div class="processorsContainer">
        <processor v-for="processorData in displayData"
                   v-bind:key="processorData.processorName"
                   :p="processorData"></processor>
      </div>
  </div>
</template>


<script>
import Processor from './components/processor.vue'

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
      displayDataStr: '',
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
  components: {
    Processor,
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
  margin-top: 60px;
}

.processorsContainer {
  display: grid;
}
</style>
