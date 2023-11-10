import { configureStore } from '@reduxjs/toolkit'
import { productListReducer } from './productList'
import { useDispatch } from 'react-redux'
import { cartReducer } from './cart'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        products: productListReducer,
        cart: cartReducer,
    },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
