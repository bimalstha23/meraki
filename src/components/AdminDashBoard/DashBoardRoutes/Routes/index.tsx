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
export const DashboardRoutes = () => {
//   const dispatch = useDispatch();

  return (
    <div>
      <Routes>
      <Route path='/' element={
    //   <ProtectedRoute>
          <DashBoard />
        // </ProtectedRoute>
        }>
          <Route path='/' element={<InnerContainer />} >
            {/* <Route path='/' element={<Navigate replace to='/home' />} /> */}
            <Route path='/AddProducts' element={
            // <ProtectedRoute>
              <AddProducts />}
            // {/* </ProtectedRoute>}  */}
            /> 
            <Route path='/' index element={<Main/>}/>
            <Route path='/ManageProducts' element={<ManageProducts/>}/>
          </Route>
          <Route path='/Settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </div>
  )
}