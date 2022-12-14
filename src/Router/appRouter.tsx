import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../components/HomePage/HomePage'
import { SingleProductPage } from '../components/SigleProductPage/SingleProductPage'
import { Products } from '../components/Products/Products'
import { Home } from '../components/home/home'
import { ProfilePage } from '../components/ProfilePage/ProfilePage'
import { DashBoardHome } from '../components/AdminDashBoard/Home/Home'
export const AppRouter = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}>
      <Route path='/' index element={<HomePage/>}/>
      <Route path='/:productid' element={<SingleProductPage/>}/>
      <Route path='/products' element={<Products/>} />
      <Route path='/profile' element={<ProfilePage/>}/>
      </Route>



      <Route path='/sellerDashBoard/*' element = {<DashBoardHome/>}/> 
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
    </>
    )
}
