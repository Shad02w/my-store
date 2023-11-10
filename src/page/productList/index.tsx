import './index.scss'
import { fetchNextProductPage, useProductsState } from '../../store/productList'
import { useAppDispatch } from '../../store'
import { FlatList } from '../../component/FlatList'
import CartIcon from '../../asset/cart.svg?react'
import { Footer } from './Footer'

export function ProductList() {
    const { loading, error, products } = useProductsState()
    const dispatch = useAppDispatch()

    const fetchNextPage = () => dispatch(fetchNextProductPage())

    return (
        <div id="product-main">
            <h3>Product List</h3>
            <FlatList
                id="product-list"
                data={products}
                keyExtractor={_ => _.id}
                onEndReach={loading ? undefined : fetchNextPage}
                renderItem={product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} />
                        <div className="title">{product.title}</div>
                        <p>{product.description}</p>
                        <span>${product.price}</span>
                        <button>
                            <CartIcon />
                        </button>
                    </div>
                )}
                listFooter={<Footer loading={loading} hasError={error != null} retry={fetchNextPage} />}
            />
        </div>
    )
}
