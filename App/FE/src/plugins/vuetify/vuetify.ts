import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/styles/overrides/_index.sass'

Vue.use(Vuetify)

export const vuetify = new Vuetify({
    theme: { disable: true },
    icons: {
        iconfont: 'mdiSvg',
    },
})
