import './index.scss'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { fetchNextProductPage, useProductsState } from '../../store/productList'
import { useCartState } from '../../store/cart'
import { FlatList } from '../../component/FlatList'
import { Page } from '../../component/Page'
import { Badge } from '../../component/Badge'
import CartIcon from '../../asset/cart.svg?react'
import { ProductCard } from './ProductCard'
import { Footer } from './Footer'

export function ProductList() {
    const { loading, error, products } = useProductsState()
    const { items } = useCartState()
    const dispatch = useAppDispatch()

    const productsToBeShown = useMemo(() => products.filter(_ => !items.includes(_.uniqueId)), [items, products])

    const fetchNextPage = () => dispatch(fetchNextProductPage())

    return (
        <Page id="product-main" title="Products">
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
                renderItem={product => <ProductCard product={product} />}
                listFooter={<Footer loading={loading} hasError={error != null} retry={fetchNextPage} />}
            />
        </Page>
    )
}
