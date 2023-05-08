import { Toast } from '.'

export interface IStateToasts {
    toasts: Toast[]
}

export interface IStateSelectedTask {
    currentSelectedId?: string
}
