import { configureStore } from '@reduxjs/toolkit'
import { productListReducer } from './productList'
import { useDispatch } from 'react-redux'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        products: productListReducer,
    },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
