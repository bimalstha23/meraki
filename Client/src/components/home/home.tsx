import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'

export const Home = () => {
  return (
    <div className='flex flex-col'>
        <div>
        <NavBar/>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
