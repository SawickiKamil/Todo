export type MapStateToComputed<S> = {
    [K in keyof S]: () => S[K]
}
