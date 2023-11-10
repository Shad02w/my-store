export interface Product {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
}

export async function getProducts(): Promise<Product[]> {
    return fetch('https://fakestoreapi.com/products?limit=20').then(res => res.json())
}
