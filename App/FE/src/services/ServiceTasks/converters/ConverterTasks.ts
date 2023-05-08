import { ITask, ITaskConfig } from '@/models'
import { IRawTask, IRawTaskConfig } from '../models'

export class ConverterTask {
    constructor() {
        throw new Error('Cannot instantiate using a static class')
    }

    static async fromRaw({ id, name, description, priority }: IRawTask): Promise<ITask> {
        return {
            id,
            name,
            description,
            priority,
        }
    }

    static toRawConfig(config: ITaskConfig): Partial<IRawTaskConfig> {
        return {
            name: config.name,
            description: config.description,
            priority: config.priority,
        }
    }
}
