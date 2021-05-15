<template>
  <div>
    <button v-bind:class="[selectedBtn === 'CONNECTOR' ? 'activeBtn' : '']" class="act-btn connector-bg"
            @click="updateOnToggle('CONNECTOR')">Connector
    </button>
    <button v-bind:class="[selectedBtn === 'OUTPUT' ? 'activeBtn' : '']" class="act-btn output-bg"
            @click="updateOnToggle('OUTPUT')">Output
    </button>
    <button v-bind:class="[selectedBtn === 'PROCESSOR' ? 'activeBtn' : '']" class="act-btn processor-bg"
            @click="updateOnToggle('PROCESSOR')">Processor
    </button>
  </div>
</template>

<script>
export default {
  name: "action",
  data: function () {
    return {
      selectedBtn: 'CONNECTOR'
    }
  },
  computed: {},
  methods: {
    updateOnToggle: function (val) {
      switch (val) {
        case 'CONNECTOR' :
          this.selectedBtn = 'CONNECTOR'
          break
        case 'OUTPUT' :
          this.selectedBtn = 'OUTPUT'
          break
        case 'PROCESSOR' :
          this.selectedBtn = 'PROCESSOR'
          break
      }
      this.$emit('toggled', val)
    }
  }
}
</script>

<style scoped>

.act-btn {
  border: none;
  color: white;
  padding: 6px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
  box-shadow: 2px 1px 2px #001327;
  border-radius: 2px;
}

.connector-bg {
  background: #228b22;
}

.output-bg {
  background: #0c4da2;
}

.processor-bg {
  background: #ff9900;
}

.user-action {
  background-color: #c60c7c; /* Green */
}

.activeBtn {
  /* border: 1px dashed #001327; */
  box-shadow: inset 2px 2px 4px black;
  outline: none
}

</style>
