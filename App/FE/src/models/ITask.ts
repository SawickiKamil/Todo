export interface ITaskFormConfig {
    name: string
    description: string
    priority: number
}

export type ITaskConfig = Required<ITaskFormConfig>

export interface ITask extends ITaskConfig {
    id: string
}
