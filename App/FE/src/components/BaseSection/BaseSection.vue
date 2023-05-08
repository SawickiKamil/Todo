<template>
    <div class="base-section">
        <h4 class="base-section__title">
            <slot name="title" />
        </h4>

        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'BaseSection',
})
</script>

<style lang="sass" scoped>
.base-section
    display: flex
    flex-direction: column

    &__header
        color: map-get($primary, 'base')
        word-wrap: break-word
        +margin(bottom)
</style>
