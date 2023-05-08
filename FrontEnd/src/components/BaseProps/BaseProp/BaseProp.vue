<template>
    <div class="base-prop" :class="{ 'base-prop--with-title': !!$attrs.title }">
        <VIcon v-if="icon" color="grey" size="18" class="base-prop__icon">{{ icon }}</VIcon>

        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'BaseProp',

    props: {
        icon: String as () => string | undefined,
    },
})
</script>

<style lang="sass">
.base-prop
    display: flex
    align-items: center
    font-size: .875rem
    color: map-get($grey, 'base')
    word-wrap: break-word

    &--with-title
        cursor: help

    &__icon
        margin-right: 2px
        +margin-xxs(top, true)
        +margin-xxs(bottom, true)
</style>
