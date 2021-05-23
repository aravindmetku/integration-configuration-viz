<template>
  <div class="processor-card">
   <div @click="clicked" :class="{'error': hasError}">
    <h6>{{ cardText }}</h6>
  </div>
  <div style="text-align:center">
    <h3 class="processor-type" v-bind:class="processor.processorType"></h3>
  </div>
  </div>
</template>

<script>

export default {
  name: 'card',
  computed: {
    cardText: function () {
      return this.processor.processorDescription ?? this.processor.processorName
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
  box-shadow:  5px 5px 10px #bec1cd,
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

.processor-card:hover {
  background: linear-gradient(145deg, #ccced5, #f3f5fe);
  box-shadow:  5px 5px 10px #c5c7ce,
  -5px -5px 10px #ffffff;
}

.error {
  color : #A91E2C
}

.inboundFactSheet {
  background: #00A399;
}

.inboundFactSheet:hover {
  height: 20px;
}

.inboundFactSheet:hover:after {
  content: 'inboundFactSheet'
}

.inboundTag {
  background: #916B50;
}

.inboundTag:hover {
  height: 20px;
}

.inboundTag:hover:after {
  content: 'inboundTag'
}

.inboundRelation {
  background: #0F7EB5;
}

.inboundRelation:hover {
  height: 20px;
}

.inboundRelation:hover:after {
  content: 'inboundRelation'
}

.inboundSubscription {
  background: #18AECE;
}

.inboundSubscription:hover {
  height: 20px;
}

.inboundSubscription:hover:after {
  content: 'inboundSubscription'
}

.inboundDocument {
  background: #33CC58;
}

.inboundDocument:hover {
  height: 20px;
}

.inboundDocument:hover:after {
  content: 'inboundDocument'
}

.inboundMetrics {
  background: #2889FF;
}

.inboundMetrics:hover {
  height: 20px;
}

.inboundMetrics:hover:after {
  content: 'inboundMetrics'
}

.inboundImpact {
  background: #9755CD;
}

.inboundImpact:hover {
  height: 20px;
}

.inboundImpact:hover:after {
  content: 'inboundImpact'
}

</style>
