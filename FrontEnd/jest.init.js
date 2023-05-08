import Vue from 'vue'
import 'jest-date-mock'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import { getFormattedTranslationArgs } from './src/utilsTest'

Vue.config.productionTip = false
Vue.use(Vuetify)

// vue-18n mocks
config.mocks.$t = getFormattedTranslationArgs
config.mocks.$tc = getFormattedTranslationArgs
config.mocks.$te = () => true
