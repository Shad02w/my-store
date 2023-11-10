import { PureComponent } from 'react'
import { withScope, captureException } from '@sentry/react'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    override componentDidCatch(error: unknown, errorInfo: Record<string, unknown>) {
        withScope(scope => {
            scope.setExtras(errorInfo)
            captureException(error)
        })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1> Oops, somethings went wrong.😔</h1>
        }

        return this.props.children
    }
}
