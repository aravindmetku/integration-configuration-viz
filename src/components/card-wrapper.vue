<template>
  <div class="wrapperContainer">
    <h5 class="header">Execution Stage: <strong>{{ data[0] }}</strong></h5>
    <div class="container">
      <card @click="processorClicked(p.pr, p.globalIdx)" v-for="(p, idx) in data[1]"
            @findVariableUsage="findVariableUsage(p.globalIdx, $event)"
            v-bind:key="idx"
            :is-in-clicked-state="selectedProcessorIndex === p.globalIdx"
            :processor="p.pr"
            :has-error="p.prErrors.length > 0"
            :var-highlight="p.selectedVarInUsage"
      ></card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {

  name: 'cardWrapper',
  computed: {},
  components: {
    card
  },
  methods: {
    processorClicked(_, idx) {
      this.$emit('click', {idx})
    },
    findVariableUsage(pGlobalIdx, variableKey) {
      console.log('card wrapper', pGlobalIdx)
      this.$emit('onFindVariableUsageClicked', {initProcessorIdx: pGlobalIdx, variableKey })
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    selectedProcessorIndex: Number
  }
}
</script>

<style>
.wrapperContainer {
  border: 1px solid lightgrey;
  padding: 5px 5px 25px;
  margin-top: 30px;
  margin-left: 5px;
  margin-right: 10px;
  border-radius: 13px;
  text-align: center;

  background: #E1E4F0;
  box-shadow: inset 5px 5px 10px #d4d6e2,
  inset -5px -5px 10px #eff2fe;
}

.header {
  color: rgba(128, 128, 128, 0.5);
  font-size: 1.2em;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
