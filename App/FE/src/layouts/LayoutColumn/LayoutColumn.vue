<template>
    <div
        class="layout-column"
        :class="{
            'layout-column--sm': sm,
            'layout-column--xs': xs,
        }"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'LayoutColumn',

    props: {
        sm: Boolean,
        xs: Boolean,
    },
})
</script>

<style lang="sass" scoped>
.layout-column
    flex: 1 1 auto
    display: flex
    flex-direction: column

    ::v-deep > *:not(:last-child)
        +margin(bottom)

    &--sm ::v-deep > *:not(:last-child)
        +margin-sm(bottom)

    &--xs ::v-deep > *:not(:last-child)
        +margin-xs(bottom)
</style>
