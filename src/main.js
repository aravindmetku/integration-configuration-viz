import Vue from 'vue'
import App from './App.vue'
import VJsoneditor from 'v-jsoneditor'
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VJsoneditor)
Vue.use(vmodal, {
    dynamicDefault: {
        draggable: true,
        resizable: true,
        height: 'auto'
    }
})


new Vue({
    render: h => h(App),
}).$mount('#app')
