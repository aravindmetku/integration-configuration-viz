<template>
 <div class="bar">
   <h2 class="title">Integration API Configuration Visualiser</h2>
   <a class="howitworks"
      href="https://github.com/aravindmetku/integration-configuration-viz/blob/master/README.md#how-it-works">How it works?</a>
 </div>
</template>

<script>
export default {
  name: "app-bar"
}
</script>

<style scoped>
  .bar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: rgb(44,44,194);
    background: linear-gradient(90deg, rgba(44,44,194,1) 0%, rgba(0,121,255,1) 100%);
  }

  .title {
    font-size: 1.3em;
    color: white;
  }

  .howitworks {
    color: white;
    margin-right: 16px;
    cursor: pointer;
  }


</style>
