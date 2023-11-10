import { useEffect } from 'react'

interface Props {
    id: string
    title: string
    children: React.ReactNode
}

const APP_NAME = 'My Store'

export function Page({ id, title, children }: Props) {
    useEffect(() => {
        document.title = `${APP_NAME} - ${title}`
    }, [title])

    return <main id={id}>{children}</main>
}
