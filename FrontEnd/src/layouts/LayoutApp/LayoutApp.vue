<template>
    <VApp>
        <slot />

        <TheToasts />
    </VApp>
</template>

<script lang="ts">
import Vue from 'vue'
import { TheToasts } from './components'

export default Vue.extend({
    name: 'LayoutApp',
    components: { TheToasts },
})
</script>
