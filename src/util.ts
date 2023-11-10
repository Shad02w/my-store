type FilterKeys<T> = {
    [K in keyof T]: T[K] extends string | number | symbol ? K : number
}[keyof T]

export function groupBy<T extends object, K extends FilterKeys<T>>(arr: T[], k: K): Record<string | number | symbol, T[]> {
    return arr.reduce(
        (acc, prev) => {
            const key = Reflect.get(prev, k) as K
            const group = acc[key] ?? []
            return { ...acc, [key]: [...group, prev] }
        },
        {} as Record<K, T[]>,
    )
}
