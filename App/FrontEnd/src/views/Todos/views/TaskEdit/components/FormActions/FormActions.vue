<template>
    <BaseBtnContainer right>
        <Component
            :is="submitBtnComponent"
            v-bind="{ disabled: !isValid, loading, large: true }"
            @click="submit"
        />
    </BaseBtnContainer>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { BaseBtnContainer } from '@/components'
import { BaseBtnAdd, BaseBtnSave } from '@/components'
import { ITask, ITaskConfig, ITaskFormConfig } from '@/models'
import { ROUTE } from '@/constants'
import { ServiceTasks } from '@/services'

export default Vue.extend({
    name: 'FormActions',

    components: { BaseBtnContainer },

    props: {
        editedTask: Object as () => ITask | undefined,
        config: {
            type: Object as () => ITaskConfig,
            required: true,
        },
        isValid: {
            type: Boolean,
            required: true,
        },
    },

    data: () => ({
        loading: false,
    }),

    computed: {
        submitBtnComponent(): VueConstructor {
            return this.editedTask ? BaseBtnSave : BaseBtnAdd
        },
    },

    methods: {
        async submit() {
            if (!this.isValidConfig(this.config)) return

            this.loading = true

            try {
                await this.createOrUpdateTask(this.config)

                this.createSuccessToast()
                this.$router.push({
                    name: ROUTE.TASK_LIST,
                })
            } catch (error) {
                this.$toasts.createServiceErrorToast(error as Error)
            }

            this.loading = false
        },

        isValidConfig(config: ITaskFormConfig): config is ITask {
            return this.isValid
        },

        createOrUpdateTask(config: ITaskConfig) {
            return this.editedTask
                ? ServiceTasks.updateTask(this.editedTask.id, config)
                : ServiceTasks.createTask(config)
        },

        createSuccessToast() {
            this.$toasts.createToast({
                type: 'success',
                message: this.editedTask ? 'Task has been updated' : 'Task has been created',
            })
        },
    },
})
</script>
