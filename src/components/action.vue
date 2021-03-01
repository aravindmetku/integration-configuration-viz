<template>
  <div>
    <div class="radio-toggles">
      <input type="radio" id="option-1" name="radio-options" value="CONNECTOR" v-model="toggle" @change="updateOnToggle">
      <label for="option-1" class="left-label">Connector</label>
      <input type="radio" id="option-2" name="radio-options" value="PROCESSOR" v-model="toggle" @change="updateOnToggle">
      <label for="option-2" class="right-label">Processor</label>
      <div class="slide-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "action",
  data: function () {
    return {
      toggle: 'CONNECTOR'
    }
  },
  computed: {
  },
  methods: {
    updateOnToggle: function () {
      this.$emit('toggled', this.toggle)
    }
  }
}
</script>

<style scoped>

.left-label {
  text-align: left;
}

.right-label {
  text-align: right;
}

.slide-item {
  background: #3b444b;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  height: calc(100% - 0.5vh);
  left: calc(50% + 4px);
  position: absolute;
  width: calc(50% - 0.2vw);
  transition: left .4s;
  z-index: 0;
}

input[type="radio"] {
  left: -9999px;
  position: absolute;
  z-index: -1;
}

input[type="radio"]:nth-of-type(1):checked ~ .slide-item {
  left: 4px;
}

input[type="radio"]:nth-of-type(2):checked ~ .slide-item {
  left: calc(50% + 4px);
}

label {
  cursor: pointer;
  padding: 0.2vh 0.5vw;
  font-size: 0.8rem;
  width: 6vw;
  z-index: 2;
  color: #fff
}

.radio-toggles {
  align-items: center;
  background: black;
  border: 1px solid #000;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  margin: left;
  margin-left: 1vw;
  margin-top: 1vh;
  max-width: 12vw;
  overflow: hidden;
  padding: 0.5vh;
  position: relative;
}
</style>
