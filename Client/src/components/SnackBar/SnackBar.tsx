import { Alert, Snackbar } from '@mui/material'
import React from 'react'
interface SnackBar {
    open: boolean,
    messege: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const SnackBar = (props: SnackBar) => {
    const { open, messege, setOpen } = props
    const handleClose = (event?:React.SyntheticEvent | Event,reason?:string) => {
        if(reason==='clickaway'){
            return;
        }
        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {messege}
            </Alert>
        </Snackbar>
    )
}
