export interface IRawTaskConfig {
    name: string
    description: string
    priority: number
}

export interface IRawTask extends IRawTaskConfig {
    id: string
}
