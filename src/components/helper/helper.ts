import { product } from "../../types"
import { useDispatch, useSelector } from "react-redux"
import { setLoginDialog } from "../../Redux/Reducer";

const Dispatch = useDispatch();
const loginDialog = useSelector((state: any) => state.modals.loginDialog)
const currentUser = useSelector((state: any) => state.user.currentUser)

export const addToCart = (product: product) => {
    if (!currentUser) {
        Dispatch(setLoginDialog(true))
    }
    else {
        // add to cart
        console.log('added to cart');
    }
}