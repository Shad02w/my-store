import './index.scss'
import { cloneElement, useEffect, useRef } from 'react'

interface Props<T> {
    id: string
    data: T[]
    keyExtractor: (d: T, i: number) => NonNullable<React.Key>
    renderItem: (d: T) => React.ReactElement
    onEndReach?: () => void
    listFooter?: React.ReactElement
}

export function FlatList<T>({ data, renderItem, keyExtractor, onEndReach, listFooter, id }: Props<T>) {
    const onEndReachRef = useRef(onEndReach)
    onEndReachRef.current = onEndReach

    useEffect(() => {
        const marker = document.getElementById(`${id}__marker`)
        if (marker) {
            const observer = new IntersectionObserver(entries => {
                const target = entries.find(entry => entry.target === marker)
                if (!target?.isIntersecting) return
                onEndReachRef.current?.()
            })

            observer.observe(marker)
            return () => observer.disconnect()
        }
    }, [id])

    return (
        <div id={id} className="c-flat-list">
            <div className="list-wrapper">{data.map((d, i) => cloneElement(renderItem(d), { key: keyExtractor(d, i) }))}</div>
            <div className="marker" id={`${id}__marker`} />
            {listFooter}
        </div>
    )
}
