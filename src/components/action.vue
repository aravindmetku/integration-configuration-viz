<template>
  <div>
    <button class="act-btn" @click="updateOnToggle('CONNECTOR')">Connector</button>
    <button class="act-btn" @click="updateOnToggle('OUTPUT')">Output</button>
    <button class="act-btn user-action" @click="updateOnToggle('PROCESSOR')">Processor</button>
  </div>
</template>

<script>
export default {
  name: "action",
  data: function () {
    return {}
  },
  computed: {},
  methods: {
    updateOnToggle: function (val) {
      this.$emit('toggled', val)
    }
  }
}
</script>

<style scoped>

.act-btn {
  background-color: #cf40e9; /* Green */
  border: none;
  color: white;
  padding: 6px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
}

.user-action {
  background-color: #c60c7c; /* Green */
}
</style>
