import React from 'react'
import { useGetCommentsOfProductQuery } from '../../Redux/Api/Api'
import { Rating } from '@mui/material'
type commentsprops = {
    productId: number,
}
export const Comments = (props: commentsprops) => {
    const { isLoading, data, error } = useGetCommentsOfProductQuery(props.productId)

    if (isLoading) return <h1>Loading</h1>
    if (error) return <h1>Error</h1>
    if (data?.length === 0) return <h1>No Comments Available</h1>


    return (
        <div className='flex flex-col '>
            <h1 className='text-2xl font-bold'>Revies</h1>
            {data?.map((comment: any) => (
                <div className='flex flex-col  border-b border-gray-200 py-4'>
                    <div className='flex flex-col justify-between'>
                        <h1 className='text-lg font-bold'>{comment.name}</h1>
                        <Rating name="read-only" value={comment.rating} readOnly />
                        <p className='text-gray-500 text-sm '>{comment.comment} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
