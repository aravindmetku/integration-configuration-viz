<template>
  <div class="flex-strip" style="background-color:#7942a8;height:4.5vh; margin: 2vh 1vw">
      <span class="purple-strip-border"
            style="color:#fff; padding: 0.4vw; font-size:0.8rem; border-left: 0.05vw; boder-color: #fff">Total Processors Count : 12 </span>
    <span class="purple-strip-border" style="color:#fff; padding: 0.4vw; font-size:0.8rem"> Highest Run Index : 4 </span>
    <span class="purple-strip-border" style="color:#fff; padding: 0.4vw; font-size:0.8rem"> Last Updated : 12:44pm </span>
  </div>
</template>

<script>
export default {
  name: "stats"
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
