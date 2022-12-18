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
        <div className='flex flex-col'>
          
        </div>
    )
}
