<template>
  <div class="processor" v-bind:style="{marginLeft: (data.run * 100) + 'px'}">
    {{ data.processorName }}
    {{ data.run }}
  </div>
</template>

<script>
export default {
  name: 'Processor',
  data: function () {
    return {
      data: this.p
    }
  },
  props: ['p']
}
</script>

<style>
.processor {
  border: grey solid 1px;
  padding: 20px;
  margin: 5px;
  width: 250px;
}
</style>
