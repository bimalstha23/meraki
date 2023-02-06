import React from 'react'
import neckless from '../../assets/neckless.png'
import { useNavigate } from 'react-router-dom'

type categoryprops = {
    category: object | any
}

export const CategoryCard = (props: categoryprops) => {
    const { category } = props;
    const navigate = useNavigate()
    return (
        <div className='flex flex-col h-60 rounded-3xl bg-[#FEEAE0]'>
            <div className='flex flex-row'>
                <div className='ml-5 mt-8'>
                    <h1 className=' font-bold text-xl'>{category?.name}</h1>
                    <p className=' text-xs font-thin text-[#726666]'>Culpa do dolore voluptate consequat irure dit velit. Amet nostrud enim eu pariatur laborum.</p>
                </div>
                <div className='rounded-3xl w-full'>
                    <img className=' rounded-3xl' src={neckless} alt="" />
                </div>
            </div>
            <button className='bg-white  w-24 ml-5 mt-6 p-2 text-xs rounded-3xl drop-shadow-lg hover:bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1] transition-all ' onClick={() => {
                navigate(`/products?category=${category?.name}`);
            }}>Browse Items</button>
        </div>
    )
}
