import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product, getProducts } from '../api'
import { useSelector } from 'react-redux'
import { RootState } from './index'

interface ProductsState {
    loading: boolean
    products: Array<Product>
    error: SerializedError | null
}

const initialState: ProductsState = {
    loading: false,
    products: [],
    error: null,
}

export const fetchNextProductPage = createAsyncThunk('products/fetchNextPage', getProducts)

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNextProductPage.fulfilled, (state, action) => {
            // Since fakeStoreAPI only returns 20 products, we need to change the id to a random string,
            // prevent the key from being reused
            state.products = [...state.products, ...action.payload.map(_ => ({ ..._, id: createKey() }))]
            state.loading = false
            state.error = null
        })

        builder.addCase(fetchNextProductPage.pending, state => {
            state.loading = true
        })

        builder.addCase(fetchNextProductPage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    },
})

function createKey() {
    return Math.random().toString(36).substr(2, 9)
}

export const productListReducer = products.reducer
export const productListActions = products.actions
export const useProductsState = () => useSelector((state: RootState) => state.products)
