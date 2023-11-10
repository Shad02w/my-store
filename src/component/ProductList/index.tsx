import { useEffect, useState } from 'react'
import { Product, fakeStoreAPI } from '../../api'
import './index.scss'

export function ProductList() {
    const [limit, setLimited] = useState(20)
    const [products, setProduct] = useState<Product[]>([])
    const { data, error, isLoading } = fakeStoreAPI.useGetProductsQuery({ limit })

    useEffect(() => {
        if (data) {
            setProduct(_ => [..._, ...data])
        }
    }, [data])

    if (isLoading) return <div>loading...</div>

    if (error || !data) return <div>error</div>

    return (
        <div id="product-list">
            <button onClick={() => setLimited(skip => skip + 10)}>load more</button>
            {products.map(product => (
                <div className="product-item" key={product.id}>
                    {product.title}
                </div>
            ))}
        </div>
    )
}
