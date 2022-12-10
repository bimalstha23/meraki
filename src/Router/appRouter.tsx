import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../components/HomePage/HomePage'
import { SingleProductPage } from '../components/SigleProductPage/SingleProductPage'
export const AppRouter = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/:productid' element={<SingleProductPage/>}/>
    </Routes>
    </>
    )
}
