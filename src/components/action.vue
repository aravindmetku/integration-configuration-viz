<template>
  <div class="btn-group">
    <button v-bind:class="[selectedEditorDisplayToggle === 'CONNECTOR' ? 'activeBtn' : '']" class="act-btn"
            @click="updateOnToggle('CONNECTOR')">Connector
    </button>
    <button v-bind:class="[selectedEditorDisplayToggle === 'OUTPUT' ? 'activeBtn' : '']" class="act-btn"
            @click="updateOnToggle('OUTPUT')">Output
    </button>
    <button v-bind:class="[selectedEditorDisplayToggle === 'PROCESSOR' ? 'activeBtn' : '']" class="act-btn"
            @click="updateOnToggle('PROCESSOR')">Processor
    </button>
  </div>
</template>

<script>
export default {
  name: "action",
  data: function () {
    return {
    }
  },
  computed: {},
  methods: {
    updateOnToggle: function (val) {
      this.$emit('toggled', val)
    }
  },
  props: {
    selectedEditorDisplayToggle: String
  }
}
</script>

<style scoped>

.btn-group {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  row-gap: 10px;
}

.act-btn {
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
  box-shadow: -7px -7px 20px 0px #fff9,
  -4px -4px 5px 0px #fff9,
  7px 0px 20px 0px #0002,
  4px 4px 5px 0px #0001;
}

.activeBtn {
  /* border: 1px dashed #001327; */
  background: linear-gradient(145deg, #e6e6e6, rgba(44, 118, 194, 0.6));
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
  -4px -4px 6px 0 rgba(116, 125, 136, .2),
  inset -4px -4px 6px 0 rgba(255, 255, 255, .5),
  inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}

</style>
