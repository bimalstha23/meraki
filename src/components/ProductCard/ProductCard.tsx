import React, { useState } from 'react'
import productimg from '../../assets/productimg.png'
import { MdAddShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAddCartMutation, useGetCartItemsQuery, useUpdateCartMutation } from '../../Redux/Api/Api'
import { SnackBar } from '../SnackBar/SnackBar'
import { product } from '../../types'
import { setCartDialog, setLoginDialog } from '../../Redux/Reducer'
import { convertCurrency } from '../../helper/helper'
type Productcardtype = {
    product: product,
    key: number
}


export const ProductCard = (props: Productcardtype) => {
    const { product } = props;
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const uid = currentUser?.uid;
    const dispatch = useDispatch();
    const [addCart] = useAddCartMutation();
    const [open, setOpen] = useState(false);

    const { data } = useGetCartItemsQuery(currentUser?.uid)
    const { name, price, rating, id,} = product;

    const cartdata = {
        name,
        price,
        rating,
        productId: id,
        qty: 1
    }

    const addToCartHandler = async () => {
        if (uid) {
            const item = data.filter((data: any) => data.productId === product.id);
            if (item.length <= 0) {
                await addCart({ name, price, rating, productId: id, uid, qty: 1 }).then(() => {
                    dispatch(setCartDialog(true))
                    setOpen(true)
                })
            } else {
                dispatch(setCartDialog(true))
            }
        } else {
            dispatch(setLoginDialog(true))
        }
    }
    const Image = product?.Image[0];
    return (
        <>
            <SnackBar open={open} setOpen={setOpen} messege={'The Product Has been successfully added to cart'} />
            <div className='group flex flex-col h-80 rounded-3xl box shadow-2xl cursor-pointer c'>
                <div className='h-full rounded-3xl p-3' style={{ backgroundImage: `url(${Image})` ,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
            }}>

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
                        <h1 className='my-3 flex justify-center p-3 items-center h-10 rounded-3xl font-bold  bg-gradient-to-r from-[#FDC1A2] to-[#FFEFE8]'>
                            {convertCurrency(price)}
                        </h1>
                    </div>
                </Link>
            </div>
        </>
    )
}
