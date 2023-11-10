import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface Product {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
}

export const fakeStoreAPI = createApi({
    reducerPath: 'fakeStoreAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    endpoints: builder => ({
        getProducts: builder.query<Product[], { limit: number }>({
            query: ({ limit }) => `products123?limit=${limit}`,
        }),
    }),
})

// TODO: Remove this API
export interface DummyProduct {
    products: Array<Product>
}

export const dummyAPI = createApi({
    reducerPath: 'dummyAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: builder => ({
        getProducts: builder.query<DummyProduct, { skip: number }>({
            query: ({ skip }) => `products?limit=20&skip=${skip}`,
        }),
    }),
})
