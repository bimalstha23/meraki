import React from 'react'
import { useDeleteAddressMutation, useGetAddressQuery } from '../../Redux/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/Store';
import { setAddressDialog, setUpdateAddressDialog } from '../../Redux/Reducer';
import AddAddress from './AddAddress';
import { BiXCircle } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import UpdateAddress from './UpdateAddress';

export const Address = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const { data, isLoading } = useGetAddressQuery(currentUser?.uid);
    const dispatch = useDispatch<AppDispatch>();
    const [deleteAddress] = useDeleteAddressMutation();


    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='w-full'>

            <div className='flex flex-row justify-between items-baseline'>
                <h1 className='font-bold text-lg'>Address</h1>
                <button onClick={() => dispatch(setAddressDialog(true)
                )} className=' mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-lg'>Add Address</button>
            </div>
            {data ? data?.map((item: any) => (
                <div className='flex flex-col border border-gray-500 rounded-md p-5 mt-3' key={item.id}>
                    <div className='flex flex-row items-center justify-between'>
                        <h1 className='font-bold text-gray-600'>{item.name}</h1>
                        <div className='flex flex-row justify-center items-center'>
                            <button onClick={() => deleteAddress(item.id)}   ><BiXCircle size={20} /></button>
                            <button onClick={() => dispatch(setUpdateAddressDialog(true))}   ><AiFillEdit size={20} /></button>
                        </div>
                    </div>
                    <UpdateAddress address={item} />
                    <h1 className='text-sm text-gray-500'>{item.phone}</h1>
                    <h1 className='text-sm text-gray-500'>{item.state} , {item.city}, {item.address},  {item.landmark}</h1>
                </div>)) : <h1>No Addresses available</h1>
            }
            <AddAddress />
        </div>
    )
}
