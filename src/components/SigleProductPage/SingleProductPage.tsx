import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddCartMutation, useGetCartItemsQuery, useGetSingleProductQuery } from '../../Redux/Api/Api'
import { ImageSwiper } from './ImageSwiper'
import { Rating } from '@mui/material'
import {MdAddShoppingCart} from 'react-icons/md'
import { OtherProductDetails } from './OtherProductDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setCartDialog, setCurrentProduct, setLoginDialog } from '../../Redux/Reducer'
import { SnackBar } from '../SnackBar/SnackBar'
import { convertCurrency } from '../../helper/helper'

export const SingleProductPage = () => {
    const { productid } = useParams();
    const { isLoading, data = {}, error } = useGetSingleProductQuery(productid);
    const dispatch = useDispatch();
    const [addCart] = useAddCartMutation();
    const currentUser  = useSelector((state:any)=>state.user.currentUser);
    const uid = currentUser?.uid;
    useEffect(()=>{
        dispatch(setCurrentProduct(data))
    },[data])

    const { data:cartdata } = useGetCartItemsQuery(currentUser?.uid)
    const {name,price, rating,id}=data;

    const [open,setOpen] = useState(false);
     
    const addToCartHandler = async () => {
        if (uid) {
            const item = cartdata?.filter((cart: any) =>{
                console.log(cart.productId,productid)
                return cart.productId == productid;
            } )
            console.log(item);
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

    return (
        <>
        <SnackBar open={open} setOpen={setOpen} messege={'The Product Has been successfully added to cart'} />
            <div className='flex flex-col justify-center' >
                <div className=' px-52 flex justify-start items-center mt-16 h-36 w-full bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1]'>
                    <h1>Product Details</h1>
                </div>
                <div className='flex flex-row gap-5 mx-52 my-10 p-5 rounded-lg shadow-lg'>
                    <div className='w-1/2 rounded-lg '>
                        <ImageSwiper images={data?.image} />
                    </div>
                    {data ? (

                        <div className='flex flex-col mt-12 gap-4 '>
                            <h1 className='text-2xl font-bold'>{data?.name}</h1>
                            <div className='flex flex-row items-center gap-2'>
                                <Rating name="read-only" value={data.rating} readOnly />
                                <p className='text-gray-500 text-sm'>{data?.numReviews} (Reviews)</p>
                            </div>
                            <p className='text-gray-500 text-sm'>In Stock</p>
                            <div className='flex flex-row items-center gap-6'>
                            <h1 className='text-lg font-normal'>{convertCurrency( data?.price)}</h1>
                            <h1 className='text-lg font-normal line-through'>{convertCurrency(data?.actualPrice)}</h1>
                            </div>
                            <p className='text-gray-500 text-sm'>{data?.description}</p>
                            <button
                            onClick={addToCartHandler}
                            className='  bg-gradient-to-tr mt-4 from-[#FDC1A2] to-[#FFEFE8] w-32 p-2 rounded-3xl flex flex-row gap-2 items-center justify-center'>
                            <h1 className='text-sm'>Add To Cart</h1>
                            <MdAddShoppingCart size={20}/>
                            </button>
                            <h1 className='text-lg font-normal '> <span className='font-bold'>Category:</span>  {data?.category?.name}</h1>
                            <div className='flex flex-row gap-3 items-center'>
                                <h1 className='text-lg font-bold'>Tags: </h1>
                                <div className='flex flex-row gap-2'>
                                    {data?.tags?.map((tag: any,key:number) => (
                                        <h1 key={key} className='text-sm font-light bg-gray-200 px-3 py-1 rounded-3xl'>{tag}</h1>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className='px-52 bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1]'>
                <OtherProductDetails />
                </div>
            </div>
        </>
    )
}
