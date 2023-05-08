import { IStateSelectedTask } from '@/models'
import { MutationTree } from 'vuex'
import { MUTATION_SELECTED_TASK, STORE_MODULE } from '@/constants'
import { IStoreModule } from '@/models'

const state = (): IStateSelectedTask => ({
    currentSelectedId: undefined,
})

const mutations: MutationTree<IStateSelectedTask> = {
    [MUTATION_SELECTED_TASK.SET_CURRENT_TASK_ID](state, id?: string): void {
        state.currentSelectedId = id
    },
}

export const selectedTask: IStoreModule<IStateSelectedTask> = {
    name: STORE_MODULE.SELECTED_TASK,
    module: {
        namespaced: true,
        state,
        mutations,
    },
}
