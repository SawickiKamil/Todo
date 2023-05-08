<template>
    <BaseFieldTextarea v-model="descriptionInternal" v-bind="attrs" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiTextBoxOutline } from '@mdi/js'
import { BaseFieldTextarea } from '@/components'

export default Vue.extend({
    name: 'FieldDescription',

    components: { BaseFieldTextarea },

    model: {
        prop: 'description',
        event: 'update:description',
    },

    props: {
        description: {
            type: String,
            required: true,
        },
        required: Boolean,
        isValid: Boolean,
    },

    computed: {
        descriptionInternal: {
            get(): string {
                return this.description
            },
            set(description: string) {
                this.$emit('update:description', description)
            },
        },

        attrs(): Record<string, unknown> {
            return {
                label: 'description*',
                prependInnerIcon: mdiTextBoxOutline,
                ...this.$attrs,
                rows: '2',
                autoGrow: true,
            }
        },

        isValidInternal(): boolean {
            return !!this.description.length
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
