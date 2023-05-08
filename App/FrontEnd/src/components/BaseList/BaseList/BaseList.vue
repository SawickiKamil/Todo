<template>
    <div class="base-list">
        <BaseSpinner v-if="isLoading" />

        <div v-else-if="isEmpty" class="base-list__placeholder">
            <VIcon color="grey" class="base-list__placeholder__icon">
                {{ placeholderIcon }}
            </VIcon>

            {{ placeholderText }}
        </div>

        <slot v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { BaseSpinner } from '@/components'
import { mdiMagnifyScan } from '@mdi/js'

export default Vue.extend({
    name: 'BaseList',

    // components: { BaseSpinner },

    props: {
        items: Array as () => unknown[] | undefined,
        placeholderText: {
            type: String,
            default() {
                return 'No data'
            },
        },
        placeholderIcon: {
            type: String,
            default: mdiMagnifyScan,
        },
    },

    computed: {
        isLoading(): boolean {
            return this.items == null
        },

        isEmpty(): boolean {
            return !this.items?.length
        },
    },
})
</script>

<style lang="sass" scoped>
.base-list
    flex: 1 1 auto
    display: flex
    flex-direction: column

    &__placeholder
        display: flex
        justify-content: center
        color: map-get($grey, 'base')
        +padding-sm

        &__icon
            +margin-xs(right)
</style>
