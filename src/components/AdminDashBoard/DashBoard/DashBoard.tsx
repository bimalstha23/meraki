import React from 'react'
import { Outlet } from 'react-router-dom'
import { InnerContainer } from '../Home/InnerContainer'
import { Sidebar } from '../Sidebar/Sidebar'

export const DashBoard = () => (
    <div className=' flex flex-row'>

        <Sidebar />

        <InnerContainer />
    </div>

)