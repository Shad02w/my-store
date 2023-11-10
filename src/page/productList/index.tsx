import './index.scss'
import { useMemo } from 'react'
import { fetchNextProductPage, useProductsState } from '../../store/productList'
import { useAppDispatch } from '../../store'
import { FlatList } from '../../component/FlatList'
import CartIcon from '../../asset/cart.svg?react'
import AddIcon from '../../asset/add.svg?react'
import { Footer } from './Footer'
import { Link } from 'react-router-dom'
import { Badge } from '../../component/Badge'
import { cartActions, useCartState } from '../../store/cart'

export function ProductList() {
    const { loading, error, products } = useProductsState()
    const { items } = useCartState()
    const dispatch = useAppDispatch()

    const productsToBeShown = useMemo(() => products.filter(_ => !items.includes(_.uniqueId)), [items, products])

    const fetchNextPage = () => dispatch(fetchNextProductPage())
    const addToCart = (id: string) => dispatch(cartActions.add(id))

    return (
        <main id="product-main">
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
                            <AddIcon />
                        </button>
                    </div>
                )}
                listFooter={<Footer loading={loading} hasError={error != null} retry={fetchNextPage} />}
            />
        </main>
    )
}
