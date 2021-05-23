<template>
  <div class="processor-card">
    <div class="card-text" @click="clicked" :class="{'error': hasError}">
      <h6>{{ cardText }}</h6>
    </div>
    <div style="text-align:center">
      <h3 class="processor-type" :style="{'background':bgColor,}" @mouseover="hover=true" @mouseleave="hover=false">
        <span v-if="hover">
        {{ processor.processorType }}
        </span>
      </h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'card',
  data: function () {
    return {
      hover: false
    }
  },
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
  background: #e3e5ed;
  box-shadow: 5px 5px 10px #bec1cd,
  -5px -5px 10px #f6fbff;
}

.processor-type {
  color: #f5f5f5;
  padding: 2px;
  font-size: small;
  border-radius: 5px;
  width: 100%;
  height: 10px;
  transition: height 0.5s;
  margin: 0
}

.processor-type:hover {
  height: 20px;
}

.processor-card:hover {
  background: linear-gradient(145deg, #ccced5, #f3f5fe);
  box-shadow: 5px 5px 10px #c5c7ce,
  -5px -5px 10px #ffffff;
}

.error {
  color: #A91E2C
}

.card-text h6 {
  font-size: 0.9em;
}

</style>
