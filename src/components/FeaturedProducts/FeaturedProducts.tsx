import React from 'react'
import { useGetFeaturedProductsQuery } from '../../Redux/Api/Api'
import { ProductCard } from '../ProductCard/ProductCard';

export const FeaturedProducts = () => {
    const { data, error, isLoading } = useGetFeaturedProductsQuery('');
    return (
        <div className='flex flex-col px-32'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold'>
                    Featured Products
                </h1>
                <p className='text-gray-500 text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className='mt-5 grid grid-cols-4 gap-3'>
                {isLoading ? <h1>loading</h1> : data.map((product: any,key:number) => (
                    <ProductCard key={key} product={product} />
                ))}

            </div>
        </div>
    )
}
