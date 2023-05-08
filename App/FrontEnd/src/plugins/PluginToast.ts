import _Vue from 'vue'
import { ServiceToasts } from '@/services'

declare module 'vue/types/vue' {
    interface Vue {
        $toasts: typeof ServiceToasts
    }
}

export const PluginToasts = {
    install(Vue: typeof _Vue) {
        Vue.prototype.$toasts = ServiceToasts
    },
}
