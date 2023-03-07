import { useState } from 'react'
import { useGetCategoriesQuery, useGetProductsQuery } from '../../../Redux/Api/Api'
import { filter } from '../../../types'

export const Main = () => {
    const { data } = useGetCategoriesQuery()
    const [filterState, setFilterState] = useState<filter>({
        page: 1,
        searchQuery:'',
        category:'',
        sortby:'',
        sortOrder: 'asc',
    
      })
    const { data:products } = useGetProductsQuery(filterState);


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
                    <h1 className=' text-5xl'>{products?.length} </h1>
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
