import React from 'react'
import { useGetCommentsOfProductQuery } from '../../Redux/Api/Api'
type commentsprops = {
    productId: number,
}
export const Comments = (props: commentsprops) => {
    const { isLoading, data, error } = useGetCommentsOfProductQuery(props.productId)
    return (
        <div>Comments</div>
    )
}
