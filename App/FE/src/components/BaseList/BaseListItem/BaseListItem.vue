<template>
    <VCard class="base-list-item">
        <VListItem v-bind="$attrs" v-on="$listeners">
            <div class="base-list-item__body">
                <VListItemIcon v-if="icon" class="base-list-item__body__icon">
                    <VIcon :color="iconColor">{{ icon }}</VIcon>
                </VListItemIcon>

                <VListItemContent class="base-list-item__body__content">
                    <div class="base-list-item__body__content__title">
                        <slot />
                    </div>

                    <BaseProps v-if="$slots.props">
                        <slot name="props" />
                    </BaseProps>
                </VListItemContent>
            </div>

            <div v-if="$slots.actions" class="base-list-item__actions">
                <slot name="actions" />
            </div>
        </VListItem>
    </VCard>
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseProps } from '@/components/BaseProps'

export default Vue.extend({
    name: 'BaseListItem',

    components: { BaseProps },

    props: {
        icon: String as () => string | undefined,
    },

    computed: {
        iconColor(): string {
            return this.$listeners.click ? 'primary' : 'grey'
        },
    },
})
</script>

<style lang="sass" scoped>
::v-deep
    .v-list-item
        +on-xs-only
            flex-direction: column !important
    .v-list-item::after
        display: none

.base-list-item
    & + &
        +margin-xs(top)

    &__body
        display: flex
        width: 100%
        flex-wrap: wrap

        &__icon
            position: relative
            top: -2px

            &:first-child
                +margin-sm(right)

        &__content
            +padding-sm(top)
            +padding-sm(bottom)

            &__title
                font-weight: 600
                word-break: break-word

                &:not(:last-child)
                    +margin-xs(bottom)

    &__actions
        display: flex
        flex: 1 0 auto
        +padding-xs(top)
        +padding-xs(bottom)
        +on-xs-only
            // flex-basis: 100%
            flex-wrap: wrap
            padding-top: 0
</style>
