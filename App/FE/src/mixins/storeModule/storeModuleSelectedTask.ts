import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { MUTATION_SELECTED_TASK, STORE_MODULE } from '@/constants'
import { IStateSelectedTask, MapStateToComputed } from '@/models'

const { mapState, mapMutations } = createNamespacedHelpers(STORE_MODULE.SELECTED_TASK)

export const storeModuleSelectedTask = Vue.extend({
    computed: {
        ...(mapState(['currentSelectedId']) as MapStateToComputed<IStateSelectedTask>),
    },

    methods: {
        ...mapMutations({
            $_setCurrentTaskId: MUTATION_SELECTED_TASK.SET_CURRENT_TASK_ID,
        }),

        setCurrentTaskId(id?: string): void {
            return this.$_setCurrentTaskId(id)
        },
    },
})
