import { configureStore } from '@reduxjs/toolkit'
import { productListReducer } from './productList'
import { useDispatch } from 'react-redux'
import { fakeStoreAPI } from '../api'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        products: productListReducer,
        [fakeStoreAPI.reducerPath]: fakeStoreAPI.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(fakeStoreAPI.middleware)
    },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
