<template>
    <BaseFieldText v-model="nameInternal" v-bind="attrs" />
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseFieldText } from '@/components'
import { mdiCalendarCheck } from '@mdi/js'

export default Vue.extend({
    name: 'FieldName',

    components: { BaseFieldText },

    model: {
        prop: 'name',
        event: 'update:name',
    },

    props: {
        name: {
            type: String,
            required: true,
        },
        required: Boolean,
        isValid: Boolean,
    },

    computed: {
        nameInternal: {
            get(): string {
                return this.name
            },
            set(name: string) {
                this.$emit('update:name', name)
            },
        },

        attrs(): Record<string, unknown> {
            return {
                label: 'name*',
                prependInnerIcon: mdiCalendarCheck,
                ...this.$attrs,
            }
        },

        isValidInternal(): boolean {
            return !!this.name.length
        },
    },

    watch: {
        isValidInternal: {
            immediate: true,
            handler(isValid: boolean) {
                this.$emit('update:is-valid', isValid)
            },
        },
    },
})
</script>
