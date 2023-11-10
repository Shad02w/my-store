import { Link } from 'react-router-dom'

export default function Cart() {
    return (
        <main id="cart-main">
            <h3>Your Cart</h3>
            <Link to="/">Back to Shopping</Link>
        </main>
    )
}
