import './index.scss'
import { useCartState } from '../../store/cart'
import { Product, useProductsState } from '../../store/productList'
import { CartItem } from './CartItem'
import { Link } from 'react-router-dom'
import { groupBy } from '../../util'
import { Page } from '../../component/Page'

interface CartItem {
    sku: string[]
    quantity: number
    product: Product
}

export default function Cart() {
    const { items } = useCartState()
    const { products } = useProductsState()

    const cartItems = groupBy(
        items.map(sku => products.find(_ => _.uniqueId === sku)).filter((_): _ is Product => Boolean(_)),
        'id',
    )

    const totalItems = Object.values(cartItems).reduce((acc, cur) => acc + cur.length, 0)
    const totalAmount = Object.values(cartItems).reduce((acc, cur) => acc + cur.reduce((acc, cur) => acc + cur.price, 0), 0)

    const backToShopping = <Link to="/">Back to Shop</Link>

    return (
        <Page id="cart-main" title="Cart">
            <div className="content">
                <h3>Your Cart</h3>
                {backToShopping}
                <div className="cart-items">
                    {Object.values(cartItems).map(items => {
                        const [item] = items
                        return (
                            <CartItem
                                key={item.uniqueId}
                                id={item.uniqueId}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                quantity={items.length}
                            />
                        )
                    })}
                </div>
            </div>
            {totalItems > 0 && (
                <div className="process-to-checkout">
                    <div className="total">
                        Total({totalItems} items): <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button>Checkout</button>
                </div>
            )}
        </Page>
    )
}
