import { useAppDispatch } from '../../../store'
import { cartActions } from '../../../store/cart'
import SubtractIcon from '../../../asset/subtract.svg?react'
import './index.scss'

interface Props {
    id: string
    title: string
    price: number
    image: string
    quantity: number
}

export function CartItem({ id, title, price, image, quantity }: Props) {
    const dispatch = useAppDispatch()
    const removeFromCart = () => dispatch(cartActions.remove(id))

    return (
        <div className="cart-item" key={id}>
            <img src={image} />
            <div className="info">
                <div className="title">{title}</div>
                <span>${price}</span>
                <button onClick={removeFromCart}>
                    <SubtractIcon />
                    <span>{quantity}</span>
                </button>
            </div>
        </div>
    )
}
