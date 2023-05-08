<template>
    <LayoutView :loading="!tasks">
        <template #title> Todo app </template>

        <template #actions>
            <BaseBtnAddNew :to="createRoute" />
        </template>

        <BaseList v-bind="{ items: tasks }" :placeholder-text="`No tasks`">
            <TaskListItem
                v-for="task in tasks"
                :key="task.id"
                v-model="refreshKey"
                v-bind="{ task }"
            >
                <template #actions>
                    <BtnDelete :id="task.id" v-model="refreshKey" />
                </template>
            </TaskListItem>
        </BaseList>
    </LayoutView>
</template>

<script lang="ts">
import { storeModuleSelectedTask } from '@/mixins'
import { ITask } from '@/models'
import { ServiceTasks } from '@/services'
import { LayoutView } from '@/layouts'
import { BaseList, BaseBtnAddNew } from '@/components'
import { TaskListItem } from './components'
import { ROUTE } from '@/constants'
import { Location } from 'vue-router'
import { BtnDelete } from './components'

export default storeModuleSelectedTask.extend({
    name: 'Tasks',

    components: { LayoutView, BaseList, TaskListItem, BaseBtnAddNew, BtnDelete },

    data: () => ({
        tasks: undefined as ITask[] | undefined,
        refreshKey: Math.random(),
    }),

    computed: {
        createRoute(): Location {
            return {
                name: ROUTE.TASK_CREATE,
            }
        },
    },

    watch: {
        // this approach is not correct and causes a large number of queries,
        // it should be solved by vuex and this is where the state of the list should be kept
        refreshKey() {
            this.fetchAndSetTask()
        },
    },

    created() {
        this.fetchAndSetTask()
    },

    beforeDestroy() {
        this.setCurrentTaskId(undefined)
    },

    methods: {
        async fetchAndSetTask() {
            try {
                this.tasks = await ServiceTasks.fetchTasks()
            } catch (error) {
                this.$toasts.createServiceErrorToast(error as Error)
            }
        },
    },
})
</script>
