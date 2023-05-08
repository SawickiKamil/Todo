<template>
    <VChip class="base-chip" v-bind="attrs" v-on="$listeners">
        <VIcon v-if="icon" size="18" left>{{ icon }}</VIcon>

        <slot />
    </VChip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'BaseChip',

    props: {
        color: {
            type: String,
            default: 'primary',
        },
        icon: String,
    },

    computed: {
        attrs(): Record<string, unknown> {
            return {
                ...this.$attrs,
                color: this.color,
            }
        },
    },
})
</script>

<style lang="sass" scoped>
.base-chip
    font-size: 0.75rem
</style>
