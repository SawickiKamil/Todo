export function insertIf<T>(condition: boolean, value: T): T[] {
    return condition ? [value] : []
}
