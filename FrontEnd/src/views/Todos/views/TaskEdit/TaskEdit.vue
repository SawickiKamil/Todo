<template>
    <LayoutView :loading="loading">
        <template #title>{{ title }}</template>

        <template #subtitle>{{ id }}</template>

        <LayoutViewForm>
            <LayoutColumn>
                <Form v-model="config" v-bind="{ editedTask }" :is-valid.sync="isValid" />

                <FormActions v-bind="{ isValid, config, editedTask }" />
            </LayoutColumn>
        </LayoutViewForm>
    </LayoutView>
</template>

<script lang="ts">
import Vue from 'vue'
import { LayoutView, LayoutColumn, LayoutViewForm } from '@/layouts'
import { ITask, ITaskConfig, ITaskFormConfig } from '@/models'
import { Form, FormActions } from './components'
import { ServiceTasks } from '@/services'
import { ROUTE } from '@/constants'

// This component is designed with the ability to create and edit a resource.
// Just create the appropriate path and pass an element id
export default Vue.extend({
    name: 'TaskEdit',

    components: { LayoutView, LayoutColumn, LayoutViewForm, Form, FormActions },

    props: {
        id: String as () => string | undefined,
    },

    data: () => ({
        config: undefined as undefined | ITaskConfig,
        editedTask: undefined as ITask | undefined,
        loading: false,
        isValid: false,
    }),

    computed: {
        title(): string {
            return this.id ? 'Edit task' : 'Create task'
        },
    },

    async created() {
        this.loading = true

        try {
            this.id
                ? await this.createConfigFromTask(this.id)
                : this.createDefaultConfig(this.editedTask)
        } catch (error) {
            this.$toasts.createServiceErrorToast(error as Error)
            this.$router.replace({ name: ROUTE.TASK_LIST })
        }

        this.loading = false
    },

    methods: {
        createDefaultConfig(task?: ITask) {
            this.config = this.createConfig(task)
        },

        async createConfigFromTask(id: string) {
            try {
                this.editedTask = await ServiceTasks.fetchTask(id)

                this.config = this.createConfig(this.editedTask)
            } catch (error) {
                this.$toasts.createServiceErrorToast(error as Error)
                this.$router.replace({ name: ROUTE.TASK_LIST })
            }
        },

        createConfig(editedTask?: ITask): ITaskFormConfig {
            const { name = '', description = '', priority = 0 } = editedTask ?? {}

            return {
                name,
                description,
                priority,
            }
        },
    },
})
</script>
