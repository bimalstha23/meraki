import { onAuthStateChanged } from 'firebase/auth';
import { is } from 'immer/dist/internal';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = (props: any) => {
    // const {children,path}  = props;
    // const seller  = useSelector((state:any)=>state?.currentSeller)
    // console.log(path)
    // if(seller){
        <Navigate to={'/SellerDashboard'}/>       
    // }

    // return seller ? children : <Navigate to={'/SellerLogin'} state = {path} />
    // return onAuthStateChanged(sellerAuth,seller=>seller)? children : <Navigate to={'/SellerLogin'} state = {path} />

}