<template>
  <div @click="clicked" class="processor-card" :style="{'background-color':bgColor}">
    <h6>{{cardText}}</h6>
  </div>
</template>

<script>

export default {
  name: 'card',
  computed: {
    cardText: function() {
      return this.processor.processorDescription ?? this.processor.processorName
    },
    bgColor: function () {
      switch (this.processor.processorType) {
        case 'inboundFactSheet' :
          return '#00A399';
        case 'inboundRelation' :
          return '#0F7EB5';
        case 'inboundSubscription' :
          return '#18AECE';
        case 'inboundDocument' :
          return '#33CC58';
        case 'inboundTag' :
          return '#916B50';
        case 'inboundMetrics' :
          return '#2889FF';
        case 'inboundImpact' :
          return '#9755CD';
        default :
          return '#FAD71E';
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
  cursor: pointer;
}

.processor-card:hover {
  transform: scale(1.04);
}

</style>
