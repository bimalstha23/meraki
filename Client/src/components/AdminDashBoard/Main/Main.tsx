import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCartItemsQuery, useGetCategoriesQuery } from '../../../Redux/Api/Api'
import { getProducts } from '../../../Redux/Reducer/ProductsReducer'
import { AppDispatch } from '../../../Redux/Store'

export const Main = () => {
    const { data } = useGetCategoriesQuery()
    const { filteredProducts } = useSelector((state: any) => state.products)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getProducts())
    }, [])


    return (
        <div className='flex flex-row flex-wrap  gap-12 w-full px-11 mt-12'>
            <div className=' w-1/5 h-32 flex flex-col justify-center p-4 rounded-3xl box shadow-2xl '>
                <h1 className='text-md font-bold'>Categories</h1>
                <div className='flex flex-row gap-3  items-baseline'>
                    <h1 className=' text-5xl'>{data?.length} </h1>
                    <p>Currently</p>
                </div>
            </div>

            <div className='w-1/5 h-32 flex flex-col justify-center p-4 rounded-3xl box shadow-2xl '>
                <h1 className='text-md font-bold'>Products</h1>
                <div className='flex flex-row gap-3  items-baseline'>
                    <h1 className=' text-5xl'>{filteredProducts?.length} </h1>
                    <p>Currently</p>
                </div>
            </div>


            <div className='w-1/5 h-32 flex flex-col justify-center p-4 rounded-3xl box shadow-2xl '>
                <h1 className='text-md font-bold'>Users</h1>
                <div className='flex flex-row gap-3  items-baseline'>
                    <h1 className=' text-5xl'>2 </h1>
                    <p>Currently</p>
                </div>
            </div>

            <div className='w-1/5 h-32 flex flex-col justify-center p-4 rounded-3xl box shadow-2xl '>
                <h1 className='text-md font-bold'>Total Cart Items</h1>
                <div className='flex flex-row gap-3  items-baseline'>
                    <h1 className=' text-5xl'>18</h1>
                    <p>Currently</p>
                </div>
            </div>
        </div>


    )
}
