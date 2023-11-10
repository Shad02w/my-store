import './index.scss'
import { useCartState } from '../../store/cart'
import { Product, useProductsState } from '../../store/productList'
import { CartItem } from './CartItem'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { items } = useCartState()
    const { products } = useProductsState()

    const cartItems: Product[] = items.map(_ => products.find(product => product.uniqueId === _)).filter((_): _ is Product => Boolean(_))
    const amount = cartItems.reduce((acc, _) => acc + _.price, 0)

    const backToShopping = <Link to="/">Back to Shopping</Link>

    return (
        <main id="cart-main">
            <div className="content">
                <h3>Your Cart</h3>
                {backToShopping}
                <div className="cart-items">
                    {cartItems.map(item => (
                        <CartItem key={item.uniqueId} id={item.uniqueId} title={item.title} price={item.price} image={item.image} />
                    ))}
                </div>
                {cartItems.length > 5 && backToShopping}
            </div>
            {cartItems.length > 0 && (
                <div className="process-to-checkout">
                    <div className="total">
                        Total({cartItems.length} items): <span>${amount.toFixed(2)}</span>
                    </div>
                    <button>Checkout</button>
                </div>
            )}
        </main>
    )
}
