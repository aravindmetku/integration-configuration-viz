<template>
  <div class="flex-strip">
    <div class="stat-card">
      <h2 class="stat-card-stat">{{ processorsCount }}</h2>
      <div class="stat-card-title">Total Processors Count</div>
    </div>
    <div class="stat-card">
      <h2 class="stat-card-stat">{{ highRun }}</h2>
      <div class="stat-card-title">Highest Run Number</div>
    </div>
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
.flex-strip {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5%;
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;

  border-radius: 13px;

  background: #ffffff;
  box-shadow:  14px 14px 31px #e3e3e3,
  -14px -14px 31px #ffffff;
}

.stat-card-stat {
  font-size: 3em;
  color: rgba(0,121,255,1);
  padding-top: 10px;
}

.stat-card-title {
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  background-color: rgba(194, 194, 194, 0.1);
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>
