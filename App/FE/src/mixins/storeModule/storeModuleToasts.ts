import Vue from 'vue'
import { MUTATION_TOASTS, ACTION_TOASTS, STORE_MODULE } from '@/constants'
import { createNamespacedHelpers } from 'vuex'
import { IStateToasts, IToastConfig, MapStateToComputed, Toast } from '@/models'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(STORE_MODULE.TOASTS)

export const storeModuleToasts = Vue.extend({
    computed: {
        ...(mapState(['toasts']) as MapStateToComputed<IStateToasts>),
    },

    methods: {
        ...(mapMutations({
            removeToast: MUTATION_TOASTS.REMOVE_TOAST,
        }) as {
            removeToast(uuid: string): void
        }),

        ...(mapActions({
            createToast: ACTION_TOASTS.CREATE_TOAST,
        }) as {
            createToast(config: IToastConfig): Promise<Toast>
        }),
    },
})
