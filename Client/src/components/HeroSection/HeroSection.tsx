import React from 'react'
import hero from '../../assets/hero.svg'
import { useNavigate } from 'react-router-dom'

export const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen px-32 flex flex-row bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1] '>

            <div className='w-1/2 flex flex-col justify-center'>
                <h1 className=' text-5xl font-bold'>Better when its on</h1>
                <h1 className='text-9xl font-extrabold'>You</h1>
                <p className='text-white text-lg'>"Minim ea officia minim et reprehenderit est."</p>
                <button onClick={() => navigate('/products')} className=' mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-3xl'>Collection</button>
            </div>

            <div className='w-1/2 flex justify-center'>
                <img className='  w-96' src={hero} alt='hero' />
            </div>
        </div>
    )
}
