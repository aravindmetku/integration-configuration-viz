<template>
  <div class="flex-strip" style="background-color:#7942a8;height:4.5vh; margin: 2vh 1vw">
      <span class="purple-strip-border"
            style="color:#fff; padding: 0.4vw; font-size:0.8rem; border-left: 0.05vw; border-color: #fff">Total Processors Count : {{ processorsCount }}</span>
    <span class="purple-strip-border"
          style="color:#fff; padding: 0.4vw; font-size:0.8rem"> Highest Run Index : {{ highRun }} </span>
  </div>
</template>

<script>
export default {
  name: "stats",
  props: {
    processorsData: {
      type: Array,
      required: true
    }
  },
  computed: {
    processorsCount: function () {
      return this.processorsData?.length ?? 0;
    },
    highRun: function () {
      return this.processorsData[this.processorsData.length - 1].run;
    }
  }
}
</script>

<style scoped>

.purple-strip-border {
  border-left: white solid 1px;
}

.flex-strip {
  display: flex;
  justify-content: right;

}

</style>
