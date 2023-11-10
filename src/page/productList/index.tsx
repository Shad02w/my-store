import './index.scss'
import { productListActions, useProductsState } from '../../store/productList'
import { useAppDispatch } from '../../store'
import { FlatList } from '../../component/FlatList'
import CartIcon from '../../asset/cart.svg?react'
import { Footer } from './Footer'
import { Link } from 'react-router-dom'
import { Badge } from '../../component/Badge'
import { cartActions, useCartState } from '../../store/cart'
import { useMemo } from 'react'

export function ProductList() {
    const { loading, error, products } = useProductsState()
    const { items } = useCartState()
    const dispatch = useAppDispatch()

    const productsToBeShown = useMemo(() => products.filter(_ => !items.includes(_.uniqueId)), [items, products])

    const fetchNextPage = () => dispatch(productListActions.fetchNextPage())
    const addToCart = (id: string) => {
        dispatch(cartActions.add(id))
        dispatch(productListActions.remove(id))
    }

    return (
        <div id="product-main">
            <div className="header">
                <h3>Product List</h3>
                <Link to="/cart">
                    <Badge count={items.length}>
                        <CartIcon />
                    </Badge>
                </Link>
            </div>
            <FlatList
                id="product-list"
                data={productsToBeShown}
                keyExtractor={_ => _.uniqueId}
                onEndReach={loading ? undefined : fetchNextPage}
                renderItem={product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} />
                        <div className="title">{product.title}</div>
                        <p>{product.description}</p>
                        <span>${product.price}</span>
                        <button onClick={() => addToCart(product.uniqueId)}>
                            <CartIcon />
                        </button>
                    </div>
                )}
                listFooter={<Footer loading={loading} hasError={error != null} retry={fetchNextPage} />}
            />
        </div>
    )
}
