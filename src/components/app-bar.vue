<template>
 <div class="bar">
   <h2 class="title"> Integration API Configuration Visualiser</h2>
   <div>
     <input type="text"
            v-model="connectorName"
            @input="updated"
            placeholder="session name">
     <a class="howitworks"
        href="https://github.com/aravindmetku/integration-configuration-viz/blob/master/README.md#how-it-works">How it works?</a>
   </div>
 </div>
</template>

<script>
export default {
  name: "app-bar",
  data: function () {
    return {
      connectorName: ''
    }
  },
  methods: {
    updated() {
      this.$emit("updateTitle", this.connectorName)
    }
  }
}
</script>

<style scoped>
  .bar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: rgb(44,118,194);
    background: linear-gradient(90deg, rgba(0,121,255,1) 100%, rgba(44,118,194,1) 0%);
    box-shadow: -9px -13px 62px -7px rgba(0,0,0,0.48);
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

  input {
    margin-right: 16px;
    border-radius: 6px;
    height: 100%;
    padding-left: 25px;
    outline: none;
    border: none;
    color: white;
    background: #a5c4e3;
    box-shadow: inset 5px 5px 10px #a0bedc,
    inset -5px -5px 10px #aacaea;
  }

  ::placeholder {
    color: grey;
    opacity: 0.7; /* Firefox */
  }

</style>
