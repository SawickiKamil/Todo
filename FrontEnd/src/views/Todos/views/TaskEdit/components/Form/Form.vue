<template>
    <LayoutColumn sm>
        <FieldName v-model="name" :is-valid.sync="isNameValid" />

        <FieldDescription v-model="description" :is-valid.sync="isDescriptionValid" />

        <FieldPriority v-model="priority" />
    </LayoutColumn>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask, ITaskConfig, ITaskFormConfig } from '@/models'
import { FieldName, FieldDescription, FieldPriority } from './components'
import { LayoutColumn } from '@/layouts'

export default Vue.extend({
    name: 'Form',
    components: { FieldName, FieldDescription, LayoutColumn, FieldPriority },

    model: {
        prop: 'config',
        event: 'update:config',
    },

    props: {
        editedTask: Object as () => ITask | undefined,
        config: {
            type: Object as () => ITaskFormConfig,
            required: true,
        },
        isValid: {
            type: Boolean,
            required: true,
        },
    },

    data: () => ({
        isNameValid: false,
        isDescriptionValid: false,
    }),

    computed: {
        name: {
            get(): string {
                return this.config.name
            },
            set(name: string) {
                this.updateConfig({ name })
            },
        },

        description: {
            get(): string {
                return this.config.description
            },
            set(description: string) {
                this.updateConfig({ description })
            },
        },

        priority: {
            get(): number {
                return this.config.priority
            },
            set(priority: number) {
                this.updateConfig({ priority })
            },
        },

        isValidInternal(): boolean {
            return this.isNameValid && this.isDescriptionValid && this.priority != null
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

    methods: {
        updateConfig(payload: Partial<ITaskConfig>) {
            this.$emit('update:config', { ...this.config, ...payload })
        },
    },
})
</script>