import { ACTION_TOASTS, MUTATION_TOASTS, STORE_MODULE } from '@/constants'
import { store } from '@/store'
import { IToastConfig, Toast } from '@/models'

export const ServiceToasts = new (class ServiceToasts {
    createToast(config: IToastConfig): Promise<Toast> {
        return store.dispatch(this.getCallerPath(ACTION_TOASTS.CREATE_TOAST), config)
    }

    createServiceErrorToast(errorResponse: Error): Promise<Toast> {
        const config: IToastConfig = {
            type: 'error',
            message: this.getErrorMessage(errorResponse),
            timeout: 0,
        }

        return store.dispatch(this.getCallerPath(ACTION_TOASTS.CREATE_TOAST), config)
    }

    private getErrorMessage(errorResponse: Error) {
        return errorResponse instanceof Error ? errorResponse.toString() : errorResponse
    }

    removeToast(uuid: string): void {
        store.commit(this.getCallerPath(MUTATION_TOASTS.REMOVE_TOAST), uuid)
    }

    private getCallerPath(callerName: MUTATION_TOASTS | ACTION_TOASTS): string {
        return `${STORE_MODULE.TOASTS}/${callerName}`
    }
})()
