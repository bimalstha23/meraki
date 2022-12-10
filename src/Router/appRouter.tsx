import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../components/HomePage/HomePage'
export const AppRouter = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </>
    )
}