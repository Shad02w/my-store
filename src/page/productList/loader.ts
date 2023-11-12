import { store } from '../../store'
import { fetchNextProductPage } from '../../store/productList'

export function loader() {
    store.dispatch(fetchNextProductPage())
    return {}
}
