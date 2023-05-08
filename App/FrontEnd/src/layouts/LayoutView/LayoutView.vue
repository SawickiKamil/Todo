<template>
    <div class="layout-view">
        <div class="layout-view__header">
            <h3 class="layout-view__header__title">
                <slot name="title">
                    {{ title }}

                    <span v-if="$slots.subtitle" class="grey--text font-weight-regular">
                        <slot name="subtitle" />
                    </span>
                </slot>
            </h3>

            <BaseBtnContainer v-if="$slots.actions" sm right>
                <slot name="actions" />
            </BaseBtnContainer>
        </div>

        <div class="layout-view__content">
            <BaseSpinner v-if="loading" />
            <slot v-else />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseSpinner, BaseBtnContainer } from '@/components'

export default Vue.extend({
    name: 'LayoutView',

    components: { BaseSpinner, BaseBtnContainer },

    props: {
        loading: Boolean,
    },

    computed: {
        title(): string {
            return 'App'
        },
    },
})
</script>

<style lang="sass" scoped>
.layout-view
    flex: 1 1 auto
    display: flex
    flex-direction: column

    &__header
        +padding-sm(bottom)
        border-bottom: 1px dotted map-get($grey, 'lighten-1')
        +margin(bottom)

        &__title
            color: map-get($primary, 'base')

            &:not(:last-child)
                +margin-xs(bottom)

    &__content
        flex: 1 1 auto
        display: flex
        flex-direction: column
</style>
