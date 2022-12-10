import React from 'react'
import productimg from '../../assets/productimg.png'
import {MdAddShoppingCart} from 'react-icons/md'

type Productcardtype = {
    product: any,
    key:number
}


export const ProductCard = (props: Productcardtype) => {
    const { product } = props;
    const { name, Price } = product
    return (
        <div className='group flex flex-col h-80 rounded-3xl box shadow-2xl cursor-pointer c'>
            <div className='h-full rounded-3xl p-3' style={{backgroundImage:`url(${productimg})`}}>
                <button className='bg-white invisible rounded-full p-2 hover:bg-gradient-to-r from-[#FDC1A2] to-[#FFEFE8] group-hover:visible transition ease-in-out duration-300  '> <MdAddShoppingCart size={20}/> </button>
            </div>
            <div className='my-1 flex flex-col justify-center items-center p-2'>
                <h1 className=' text-base font-bold '>
                    {name}
                </h1>
                <h1 className=' my-3 flex justify-center items-center w-32 h-10 rounded-3xl font-bold  bg-gradient-to-r from-[#FDC1A2] to-[#FFEFE8]'>
                    Rs.{Price}
                </h1>
            </div>
        </div>
    )
}
