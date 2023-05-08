import Vue from 'vue'
import { MutationTree, ActionTree } from 'vuex'
import { MUTATION_TOASTS, ACTION_TOASTS, STORE_MODULE } from '@/constants'
import { Toast, IToastConfig, IStateToasts, IStoreModule } from '@/models'

const state = (): IStateToasts => ({
    toasts: [],
})

const mutations: MutationTree<IStateToasts> = {
    [MUTATION_TOASTS.ADD_TOAST](state, toast: Toast) {
        state.toasts.push(toast)
    },

    [MUTATION_TOASTS.REMOVE_TOAST](state, uuid: string) {
        const toastIndex = state.toasts.findIndex((toast: Toast) => toast.uuid === uuid)

        if (toastIndex !== -1) Vue.delete(state.toasts, toastIndex)
    },
}

const actions: ActionTree<IStateToasts, unknown> = {
    async [ACTION_TOASTS.CREATE_TOAST]({ commit }, config: IToastConfig): Promise<Toast> {
        const toast = new Toast(config)

        commit(MUTATION_TOASTS.ADD_TOAST, toast)

        return toast
    },
}

export const toasts: IStoreModule<IStateToasts> = {
    name: STORE_MODULE.TOASTS,
    module: {
        namespaced: true,
        state,
        mutations,
        actions,
    },
}
