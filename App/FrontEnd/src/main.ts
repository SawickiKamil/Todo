import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import { vuetify } from './plugins'
import { PluginToasts } from '@/plugins'

Vue.config.productionTip = false
Vue.use(PluginToasts)

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
