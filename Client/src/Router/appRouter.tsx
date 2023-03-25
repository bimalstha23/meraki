import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../components/HomePage/HomePage'
import { SingleProductPage } from '../components/SigleProductPage/SingleProductPage'
import { Products } from '../components/Products/Products'
import { Home } from '../components/home/home'
import { ProfilePage } from '../components/ProfilePage/ProfilePage'
import { DashBoardHome } from '../components/AdminDashBoard/Home/Home'
import { Profile } from '../components/ProfilePage/Profile'
import { Address } from '../components/ProfilePage/Address'
import { Orders } from '../components/ProfilePage/Orders'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' index element={<HomePage />} />
          <Route path='/:productid' element={<SingleProductPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<ProfilePage />}>
            <Route path='/profile' index element={<Profile />} />
            <Route path='orders' element={<Orders />} />
            <Route path='addresses' element={<Address />} />
            <Route path='reviews' element={<h1>Reviews</h1>} />
            <Route path='account-settings' element={<h1>Account Settings</h1>} />
          </Route>
        </Route>



        <Route path='/sellerDashBoard/*' element={<DashBoardHome />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}
