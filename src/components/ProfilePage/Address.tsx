import React from 'react'
import { useGetAddressQuery } from '../../Redux/Api/Api'
import { useSelector } from 'react-redux'

export const Address = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const { data, isLoading } = useGetAddressQuery(currentUser?.uid);
    return (
        <div className='w-full'>
            <div className='flex flex-row justify-between items-baseline'>
                <h1 className='font-bold text-lg'>Address</h1>
                <button className=' mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-lg'>Add Address</button>
            </div>
            {data ? data?.map((item: any) => (
                <div className='flex flex-col border border-gray-500 rounded-md p-5 mt-3' key={item.id}>
                    <h1 className='font-bold text-gray-600'>{item.name}</h1>
                    <h1 className='text-sm text-gray-500'>{item.phone}</h1>
                    <h1 className='text-sm text-gray-500'>{item.state} , {item.city}, {item.address},  {item.landmark}</h1>
                </div>)) : <h1>No Addresses available</h1>
            }
        </div>
    )
}
