<template>
  <div class="accordion" id="myAccordion">
    <div class="card processor-card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0 processor-card-header">
          <button type="button" data-toggle="collapse" class="processor-card-header" data-target="#collapseOne">Processor Run :
            {{ processor.run }}
          </button>
        </h2>
      </div>
      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#myAccordion">
        <div class="card-body">
          <p>HTML stands for HyperText Markup Language. HTML is the standard markup language for describing the structure of web
            pages. <a href="https://www.tutorialrepublic.com/html-tutorial/" target="_blank">Learn more.</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'card',
  computed: {},
  methods: {},
  props: {
    processor: {
      run: Number,
      processorDescription: String,
      processorName: String,
      processorType: String
    }
  },
  mounted() {
    console.log('inside card vue the processors are ', this.$props)
  }
}
</script>

<style>
.processor-card {
  margin: 2vw;
  height: 8vh;
  background-color: black;
}

.processor-card-header {
  background-color: black;
  color: blanchedalmond;
}

.processor-card-body {

}
</style>
