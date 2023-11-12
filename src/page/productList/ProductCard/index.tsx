import { useAppDispatch } from '../../../store'
import { cartActions } from '../../../store/cart'
import { Product } from '../../../store/productList'
import AddIcon from './asset/add.svg?react'

interface Props {
    product: Product
}
export function ProductCard({ product }: Props) {
    const dispatch = useAppDispatch()
    const addToCart = (id: string) => dispatch(cartActions.add(id))
    return (
        <div className="product-card" key={product.id}>
            <img src={product.image} />
            <div className="title">{product.title}</div>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
            <button onClick={() => addToCart(product.uniqueId)}>
                <AddIcon />
            </button>
        </div>
    )
}
