import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../api'

interface ProductsState {
    loading: boolean
    skip: number
    products: Array<Product>
}

const initialState: ProductsState = {
    loading: false,
    skip: 0,
    products: [],
}

const fetchNextProductPage = createAsyncThunk('products/fetchNextPage', async (skip: number) => {
    const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`)
    return response.json()
})

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNextProductPage.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload.products)
            state.skip = action.payload
        })

        builder.addCase(fetchNextProductPage.pending, (state, action) => {
            console.log(action)
        })

        builder.addCase(fetchNextProductPage.rejected, (state, action) => {
            console.log(action.error)
        })
    },
})

export const productListReducer = products.reducer
export const productListActions = products.actions
