import { useSelector } from 'react-redux'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface CartState {
    items: string[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action: PayloadAction<string>) {
            state.items = [...state.items, action.payload]
        },
        remove(state, action: PayloadAction<string>) {
            state.items = state.items.filter(id => id !== action.payload)
        },
    },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

export const useCartState = () => useSelector((state: RootState) => state.cart)
