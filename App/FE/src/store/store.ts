import { store } from './instance'
import * as modules from './modules'

// eslint-disable-next-line
Object.values(modules).forEach((m: any) => store.registerModule(m.name, m.module))

export { store }
