import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './page/productList'
import { Provider } from 'react-redux'
import { store } from './store'
import { ErrorBoundary } from './component/ErrorBoundary'

const Cart = lazy(() => import('./page/cart'))

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route
                            path="/cart"
                            element={
                                <Suspense fallback="loading...">
                                    <Cart />
                                </Suspense>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    )
}

export default App
