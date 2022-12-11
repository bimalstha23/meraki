import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleProductQuery } from '../../Redux/Api/Api'
import { ImageSwiper } from './ImageSwiper'
export const SingleProductPage = () => {
    const { productid } = useParams();
    const { isLoading, data, error } = useGetSingleProductQuery(productid);
    return (
        <>
            <div className='flex flex-col justify-center'>
                <div className=' px-52 flex justify-start items-center mt-16 h-36 w-full bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1]'>
                    <h1>Product Details</h1>
                </div>
                <div className='flex flex-row mx-52 my-10 p-5 rounded-lg shadow-lg'>
                    <div className='w-1/2 rounded-lg '>
                        <ImageSwiper images={data?.images} />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-2xl font-bold'>{data?.name}</h1>
                        <h1 className='text-2xl font-bold'>Rs.{data?.Price}</h1>
                        <p className='text-gray-500 text-sm'>{data?.description}</p>
                        <button className=' mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-3xl'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
