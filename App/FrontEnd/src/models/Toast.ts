export type IToastType = 'primary' | 'success' | 'error' | 'warning'

export interface IToastConfig {
    type?: IToastType
    message: string
    timeout?: number
}

const TOAST_MIN_TIMEOUT_MS = 4000

export class Toast {
    readonly uuid: string
    public type: IToastType
    public message: string
    public timeout?: number

    constructor({ type = 'primary', message = 'Unknown error', timeout }: IToastConfig) {
        this.uuid = this.getUuid()
        this.type = type
        this.message = message
        this.timeout = timeout ?? this.getCalculatedTimeout(message)
    }

    private getCalculatedTimeout(text: string): number {
        const calculatedTimeout = 100 * text.toString().length

        return Math.max(calculatedTimeout, TOAST_MIN_TIMEOUT_MS)
    }

    private getUuid(): string {
        return `${Date.now()}-${Math.random()}`
    }
}
