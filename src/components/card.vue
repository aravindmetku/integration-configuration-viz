<template>
  <div @click="clicked" class="processor-card" :class="{'error': hasError}" :style="{'background-color':bgColor}">
    <h6>{{ cardText }}</h6>
  </div>
</template>

<script>

export default {
  name: 'card',
  computed: {
    cardText: function () {
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
      this.$emit('click');
    }
  },
  props: {
    processor: {
      run: Number,
      processorDescription: String,
      processorName: String,
      processorType: String
    },
    hasError: Boolean
  },
  mounted() {
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

.error {
  border: 3px solid red;
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}

@keyframes blink-animation {
  to {
    border-color: white;
  }
}

@-webkit-keyframes blink-animation {
  to {
    border-color: white;
  }
}

</style>
