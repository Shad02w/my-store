import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { withScope, captureException } from '@sentry/react'
import { Product as APIProductType, getProducts } from '../api'
import { useSelector } from 'react-redux'
import { RootState } from './index'

export interface Product extends APIProductType {
    uniqueId: string
}

export interface ProductsState {
    loading: boolean
    products: Array<Product>
    error: SerializedError | null
}

export const fetchNextProductPage = createAsyncThunk('products/fetchNextPage', getProducts)

const initialState: ProductsState = {
    loading: false,
    products: [],
    error: null,
}

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNextProductPage.fulfilled, (state, action) => {
            // Since fakeStoreAPI only returns 20 products, we need to change the id to a random string,
            // prevent the key from being reused
            state.products = [...state.products, ...action.payload.map(_ => ({ ..._, uniqueId: createKey() }))]
            state.loading = false
        })

        builder.addCase(fetchNextProductPage.pending, state => {
            state.loading = true
            state.error = null
        })

        builder.addCase(fetchNextProductPage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
            withScope(scope => {
                scope.setTag('action', 'fetchNextProductPage')
                scope.setExtras(state)
                captureException(action.error)
            })
        })
    },
})

export const productListReducer = products.reducer
export const useProductsState = () => useSelector((state: RootState) => state.products)

function createKey() {
    return Math.random().toString(36).substr(2, 9)
}
