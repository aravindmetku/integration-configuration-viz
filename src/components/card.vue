<template>
  <div @click="clicked" class="processor-card" :style="{'background-color':bgColor}">
    <h6>{{processor.processorName}}</h6>
  </div>
</template>

<script>

export default {
  name: 'card',
  computed: {
    bgColor: function() {
    switch(this.processor.processorType) {
      case 'inboundFactSheet' : return 'red';
      case 'inboundRelation' : return 'orange';
      case 'inboundSubscription' : return 'blue';
      case 'inboundDocument' : return 'yellow';
      case 'inboundTag' : return 'violet';
      case 'inboundMetrics' : return 'indigo';
      case 'inboundImpact' : return 'green';
      default : return 'white';
    }
    }
  },
  methods: {
    clicked() {
      this.$emit('click')
    }
  },
  props: {
    processor: {
      run: Number,
      processorDescription: String,
      processorName: String,
      processorType: String
    }
  },
  mounted() {
    console.log('inside card vue the processors are ', this.$props)
  }
}
</script>

<style>
.processor-card {
  padding: 20px;
  border-radius: 6px;
  margin: 3px;
}

</style>
