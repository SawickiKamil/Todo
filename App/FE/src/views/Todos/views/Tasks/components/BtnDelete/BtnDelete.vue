<template>
    <BaseBtnDelete text :loading="isDeleting" @click="deleteTask" />
</template>

<script lang="ts">
import { storeModuleSelectedTask } from '@/mixins'
import { BaseBtnDelete } from '@/components'
import { ServiceTasks } from '@/services'

export default storeModuleSelectedTask.extend({
    name: 'BtnDelete',

    components: { BaseBtnDelete },

    model: {
        prop: 'refreshKey',
        event: 'update:refresh-key',
    },

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        isDeleting: false,
    }),

    methods: {
        async deleteTask() {
            this.isDeleting = true

            try {
                await ServiceTasks.deleteTask(this.id)

                if (this.id === this.currentSelectedId) {
                    this.setCurrentTaskId(undefined)
                }

                // just to fake proper BTN behavior
                setTimeout(
                    () =>
                        this.$emit(
                            'update:refresh-key',
                            Math.random(),
                            (this.isDeleting = false),
                            this.createSuccessToast()
                        ),
                    300
                )
            } catch (error) {
                this.$toasts.createServiceErrorToast(error as Error)
            }
        },

        createSuccessToast() {
            this.$toasts.createToast({
                type: 'success',
                message: 'Task has been deleted',
            })
        },
    },
})
</script>
