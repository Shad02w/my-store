import './index.scss'

interface Props {
    loading: boolean
    hasError: boolean
    retry: () => void
}
export function Footer({ loading, hasError, retry }: Props) {
    let content: React.ReactElement | null = null
    if (loading) content = <div className="loading">Loading...</div>
    if (hasError)
        content = (
            <div className="error">
                Oops, somethings went wrong.😔 <button onClick={retry}>Retry</button>
            </div>
        )

    return <div id="product-list-footer">{content}</div>
}
