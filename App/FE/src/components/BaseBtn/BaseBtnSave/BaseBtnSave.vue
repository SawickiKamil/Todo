<template>
    <BaseBtn v-bind="attrs" v-on="$listeners">
        <VIcon left>{{ mdiCheck }}</VIcon>

        <span>Save</span>
    </BaseBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCheck } from '@mdi/js'
import { BaseBtn } from '../BaseBtn'

export default Vue.extend({
    name: 'BaseBtnSave',

    components: { BaseBtn },

    data: () => ({
        mdiCheck,
    }),

    computed: {
        attrs(): Record<string, unknown> {
            return {
                ...this.$attrs,
                type: 'submit',
            }
        },
    },
})
</script>
