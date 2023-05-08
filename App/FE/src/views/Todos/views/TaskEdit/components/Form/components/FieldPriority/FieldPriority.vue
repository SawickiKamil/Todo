<template>
    <BaseFieldNumber v-model="priorityInternal" v-bind="attrs" :max="6" nullable />
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseFieldNumber } from '@/components'
import { mdiChartLineVariant } from '@mdi/js'

export default Vue.extend({
    name: 'FieldPriority',

    components: { BaseFieldNumber },

    model: {
        prop: 'priority',
        event: 'update:priority',
    },

    props: {
        priority: Number as () => number | undefined,
    },

    computed: {
        priorityInternal: {
            get(): number | undefined {
                return this.priority
            },
            set(priority: number) {
                this.$emit('update:priority', priority)
            },
        },

        attrs(): Record<string, unknown> {
            return {
                prependInnerIcon: mdiChartLineVariant,
                label: 'Priority*',
                ...this.$attrs,
            }
        },
    },
})
</script>
