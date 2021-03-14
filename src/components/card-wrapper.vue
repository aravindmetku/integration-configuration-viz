<template>
  <div>
    run - {{data[0]}}
    <card @click="processorClicked(p.pr, p.globalIdx)" v-for="(p, idx) in data[1]" v-bind:key="idx" :processor="p.pr"></card>
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
</style>
