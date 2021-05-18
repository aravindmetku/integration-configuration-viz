<template>
  <div class="wrapperContainer">
    <h5 class="header">Processor Execution Stage - {{data[0]}}</h5>
    <div class="container">
      <card @click="processorClicked(p.pr, p.globalIdx)" v-for="(p, idx) in data[1]"
            v-bind:key="idx"
            :processor="p.pr"
            :has-error="p.prErrors.length > 0"
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
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  .wrapperContainer {
    border: 1px solid lightgrey;
    padding: 5px;
    margin: 5px;
    border-radius: 6px;
    text-align: center;
  }
  .header {
    background-color: lightblue
  }
 .container {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
 }
</style>
