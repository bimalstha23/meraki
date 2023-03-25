import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { DashBoard } from '../../DashBoard/DashBoard'
import { InnerContainer } from '../../Home/InnerContainer'
import { AddProducts } from '../../AddProducts/AddProducts'
import { Settings } from '../../Settings/Settings'
import { Main } from '../../Main/Main'
import ManageProducts from '../../ManageProducts/ManageProducts'
import { AdminOrders } from '../../AdminOrders/AdminOrders'

export const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <DashBoard />
        }>
          <Route path='/' element={<InnerContainer />} >
            <Route path='/AddProducts' element={
              <AddProducts />}
            />
            <Route path='/' index element={<Main />} />
            <Route path='/ManageProducts' element={<ManageProducts />} />
          </Route>
          <Route path='/Settings' element={<Settings />} />
          <Route path='/orders' element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  )
}