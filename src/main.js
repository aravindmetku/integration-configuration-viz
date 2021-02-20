import Vue from 'vue'
import App from './App.vue'
import VJsoneditor from 'v-jsoneditor'
import vmodal from 'vue-js-modal'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(codemirror)
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
