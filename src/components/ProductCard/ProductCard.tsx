import React from 'react'
import productimg from '../../assets/productimg.png'
import { MdAddShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAddCartMutation } from '../../Redux/Api/Api'
// import { addToCart } from '../helper/helper'
import { product } from '../../types'
import { setLoginDialog } from '../../Redux/Reducer'
type Productcardtype = {
    product: product,
    key: number
}


export const ProductCard = (props: Productcardtype) => {
    const { product } = props;
    const { name, price } = product;
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const uid = currentUser?.uid;
    const dispatch = useDispatch();
    const [addCart] = useAddCartMutation()

    const addToCartHandler = async () => {
        if (uid) {
            await addCart({ uid, ...product })
        } else {
            dispatch(setLoginDialog(true))
        }
    }
    return (
        <div className='group flex flex-col h-80 rounded-3xl box shadow-2xl cursor-pointer c'>
            <div className='h-full rounded-3xl p-3' style={{ backgroundImage: `url(${productimg})` }}>

                <button onClick={(e) => {
                    if (!currentUser) {
                        dispatch(setLoginDialog(true))
                        return;
                    } else {
                        addToCartHandler()
                    }
                }

                }
                    className='bg-white invisible rounded-full p-2 hover:bg-gradient-to-r from-[#FDC1A2] to-[#FFEFE8] group-hover:visible transition ease-in-out duration-300  '> <MdAddShoppingCart size={20} /> </button>
            </div>
            <Link to={`/${product.id}`}>
                <div className='my-1 flex flex-col justify-center items-center p-2'>
                    <h1 className=' text-base font-bold '>
                        {name}
                    </h1>
                    <h1 className='my-3 flex justify-center items-center w-32 h-10 rounded-3xl font-bold  bg-gradient-to-r from-[#FDC1A2] to-[#FFEFE8]'>
                        Rs.{price}
                    </h1>
                </div>
            </Link>
        </div>
    )
}
