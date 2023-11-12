import { Suspense, lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ProductList } from './page/productList'
import { loader as productListLoader } from './page/productList/loader'

const Cart = lazy(() => import('./page/cart'))

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route loader={productListLoader} path="/" element={<ProductList />} />
            <Route
                path="/cart"
                element={
                    <Suspense fallback="loading...">
                        <Cart />
                    </Suspense>
                }
            />
        </Route>,
    ),
)
