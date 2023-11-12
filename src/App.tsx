import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ErrorBoundary } from './component/ErrorBoundary'
import { router } from './router'

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBoundary>
    )
}

export default App
