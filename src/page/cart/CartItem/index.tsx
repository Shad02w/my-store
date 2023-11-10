import { useAppDispatch } from '../../../store'
import { cartActions } from '../../../store/cart'
import './index.scss'

interface Props {
    id: string
    title: string
    price: number
    image: string
}

export function CartItem({ id, title, price, image }: Props) {
    const dispatch = useAppDispatch()
    const removeFromCart = () => dispatch(cartActions.remove(id))

    return (
        <div className="cart-item" key={id}>
            <img src={image} />
            <div className="info">
                <div className="title">{title}</div>
                <span>${price}</span>
                <button onClick={removeFromCart}>Remove</button>
            </div>
        </div>
    )
}
