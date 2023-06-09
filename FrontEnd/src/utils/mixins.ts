import Vue, { VueConstructor } from 'vue'

export function mixins<T extends VueConstructor[]>(
    ...args: T
): ExtractVue<T> extends infer V ? (V extends Vue ? VueConstructor<V> : never) : never
export function mixins<T extends Vue>(...args: VueConstructor[]): VueConstructor<T>
export function mixins(...args: VueConstructor[]): VueConstructor {
    return Vue.extend({ mixins: args })
}

/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using mixins().extend()
 */
export type ExtractVue<T extends VueConstructor | VueConstructor[]> = T extends (infer U)[]
    ? UnionToIntersection<U extends VueConstructor<infer V> ? V : never>
    : T extends VueConstructor<infer V>
    ? V
    : never

// eslint-disable-next-line
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never
