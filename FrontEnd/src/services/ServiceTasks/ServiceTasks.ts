import { Backend, ITaskConfig } from '@/models'
import { ITask } from '@/models'
import { IRawTask } from './models'
import { ConverterTask } from './converters'

export const ServiceTasks = new (class ServiceTasks extends Backend {
    async fetchTasks(): Promise<ITask[]> {
        const { data } = await this.get<IRawTask[]>(`todos`)

        return data
    }

    async fetchTask(id: string): Promise<ITask> {
        const { data } = await this.get<IRawTask>(`todos/${id}`)

        return ConverterTask.fromRaw(data)
    }

    async updateTask(id: string, config: ITaskConfig): Promise<ITask> {
        const { data } = await this.patch<IRawTask>(
            `todos/${id}`,
            ConverterTask.toRawConfig(config)
        )

        return ConverterTask.fromRaw(data)
    }

    async createTask(config: ITaskConfig): Promise<ITask> {
        const { data } = await this.post<IRawTask>(`todos`, ConverterTask.toRawConfig(config))

        return ConverterTask.fromRaw(data)
    }

    async deleteTask(id: string): Promise<void> {
        await this.delete<IRawTask>(`todos/${id}`)
    }
})()
