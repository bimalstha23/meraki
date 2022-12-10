import React from 'react'
import { useParams } from 'react-router-dom'

export const SingleProductPage = () => {
    const {productid} = useParams();
    console.log(productid);
    return (
        <div> {productid} </div>
    )
}
