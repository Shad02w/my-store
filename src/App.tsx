import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './component/ProductList'
import { Cart } from './component/Cart'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
