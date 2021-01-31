<template>

  <div class="processor" v-bind:style="{marginLeft: (data.run * 100) + 'px'}" @click="showEditor">

    <modal :name="'editor-' + id"
           :width="700"
           :height="800"
           :adaptive="true"
           @closed="onEditorClosed">
      <v-jsoneditor v-model="data" :options="options" :plus="true" height="800px" @error="onError">
      </v-jsoneditor>
    </modal>


    {{ data.processorName }}
    {{ data.run }}
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'

export default {
  name: 'Processor',
  data: function () {
    return {
      data: {...this.p},
      options: {
        mode: 'code'
      }
    }
  },
  computed: {
    id() {
      return this.p.processorName;
    }
  },
  methods: {
    onError() {
      console.log('error')
    },
    showEditor() {
      this.$modal.show(`editor-${this.id}`)
    },
    onEditorClosed() {
      // console.log('update the main displaystr now' );
      // console.log(this.data)
      this.$emit('input', this.data)
    }
  },
  components: {
    VJsoneditor
  },
  props: ['p']
}
</script>

<style>
.processor {
  border: grey solid 1px;
  padding: 20px;
  margin: 5px;
  width: 250px;
}
</style>
