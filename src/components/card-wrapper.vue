<template>
  <div class="wrapperContainer">
    <h5 class="header">Execution Stage: <strong>{{data[0]}}</strong></h5>
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
    padding: 5px 5px 25px;
    margin-top: 30px;
    margin-left: 5px;
    margin-right: 10px;
    border-radius: 13px;
    text-align: center;

    background: #E1E4F0;
    box-shadow: inset 7px 7px 14px #e3e3e3,
    inset -7px -7px 14px #ffffff;
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
