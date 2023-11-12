import './index.scss'
import { useEffect, useMemo, useRef } from 'react'

interface Props<T> {
    id: string
    data: T[]
    /*
     *  determine the key of each item in the list.
     */
    keyExtractor: (d: T, i: number) => NonNullable<React.Key>
    renderItem: (d: T) => React.ReactElement
    /*
     *  This function will be called when the user scroll to the end of the list.
     */
    onEndReach?: () => void
    /**
     * trigger onEndReach when the user scroll to the end of the list minus this number.
     * Default: 6.
     */
    overScan?: number
    listFooter?: React.ReactElement
}

export function FlatList<T>({ data, renderItem, keyExtractor, onEndReach, listFooter, id, overScan = 6 }: Props<T>) {
    const onEndReachRef = useRef(onEndReach)
    onEndReachRef.current = onEndReach

    const markId = useMemo(() => `${id}__marker`, [id])
    const markerIndex = Math.max(0, data.length - overScan)

    // use IntersectionObserver to detect scroll to bottom instead of listening to onScroll for better performance.
    useEffect(() => {
        const marker = document.getElementById(markId)
        if (marker) {
            const observer = new IntersectionObserver(entries => {
                const target = entries.find(entry => entry.target === marker)
                if (!target?.isIntersecting) return
                onEndReachRef.current?.()
            })

            observer.observe(marker)
            return () => observer.disconnect()
        }
    }, [markId, data])

    return (
        <div id={id} className="c-flat-list">
            <div className="list-wrapper">
                {data.map((d, i) => {
                    return (
                        <div id={i === markerIndex ? markId : undefined} className="list-item" key={keyExtractor(d, i)}>
                            {renderItem(d)}
                        </div>
                    )
                })}
            </div>
            {listFooter}
        </div>
    )
}
