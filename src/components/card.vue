<template>
  <div @click="clicked" class="processor-card" :class="{'error': hasError}" :style="{'border-bottom':`solid 6px ${bgColor}`}">
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
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  line-height: 100%;
  color: rgba(0, 0, 0, 0.5);

  border-radius: 8px;
  background: #f5f5f5;
  box-shadow:  9px 9px 19px #d7d7d7,
  -9px -9px 19px #ffffff;
}

.processor-card:hover {
  animation: shadow-fadein 0.5s ease-in both;
}

@keyframes shadow-fadein {
  0% {
    background: linear-gradient(180deg, #dadada, #ffffff);
  }
  33% {
    background: linear-gradient(165deg, #dadada, #ffffff);
  }
  55% {
    background: linear-gradient(155deg, #dadada, #ffffff);
  }
  65% {
    background: linear-gradient(140deg, #dadada, #ffffff);
  }
  100% {
    background: linear-gradient(145deg, #dadada, #ffffff);
  }
}

.error {
  border: 1px dashed red;
  /*animation: blink-animation 1s steps(5, start) infinite;*/
  /*-webkit-animation: blink-animation 1s steps(5, start) infinite;*/
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
