import React, { Dispatch, SetStateAction } from 'react'
import { Alert, Button, Collapse, Dialog, Link, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { buyerAuth, buyerDb } from '../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { setLoginDialog, setRegisterDialog, setUserLoginDetails } from '../../Redux/Reducer'

// import { signInwithGoogle } from '../../Redux/Slice'

export const Login = () => {
    // const { DialogOpen, setDialogOpen, setRegisterDialogOpen } = props;
    const loginDialog = useSelector((state:any)=>state.modals.loginDialog)
    const RegisterDialog  = useSelector((state:any)=>state.modals.RegisterDialog)
    const Dispatch = useDispatch();
    const signInwithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(buyerAuth, provider).then((res) => {
            const { user } = res;
            Dispatch(setUserLoginDetails(user));
            const userRef = doc(buyerDb, "users", user.uid);
            setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
            })
        });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: {
            email: String,
            password: String
        }) => {
            console.log('submited', values);
        }
    })
    const handleClose = () => {
        Dispatch(setLoginDialog(false))
    }
    return (
        <Dialog open={loginDialog} onClose={handleClose}

        >
            <div className='p-4'>
                <form action="" onSubmit={
                    (e) => {
                        e.preventDefault();
                        formik.handleSubmit()
                    }
                }>
                    <Typography fontWeight={'Bold'} variant='h4' paddingBottom={4}>
                        Welcome Back
                    </Typography>
                    <TextField onChange={formik.handleChange} value={formik?.values.email} name='email' type={'email'} margin='normal' id="outlined" label="Email" variant="outlined" fullWidth required />
                    <TextField onChange={formik.handleChange} value={formik?.values.password} name='password' type={'password'} margin='normal' id="outlined" label="password" variant="outlined" fullWidth required />

                    <Collapse
                    // in={showError}
                    >
                        <Alert severity="error"
                        >
                            {/* {error} */}
                        </Alert>
                    </Collapse>
                    <Link href='/ForgotPassword' fontWeight={'Bold'} textAlign={'right'} underline='none' color='inherit' sx={{ marginBottom: '20px', marginTop: '10px' }}> Forgot Password?</Link>
                    <LoadingButton
                        //   loading={isSignInloading} 
                        type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
                        <Typography variant='body1'>
                            Log In
                        </Typography>
                    </LoadingButton>
                    <Typography textAlign={'center'} color={'GrayText'} variant='subtitle2' fontWeight={'Bold'} sx={{ margin: '15px' }}>
                        ----- OR -----
                    </Typography>

                    <div className='flex flex-col'>

                        <LoadingButton
                            // loading={data.isLoading}
                            onClick={() => signInwithGoogle()}
                            size='medium' variant='contained' sx={{ textTransform: 'none' }} startIcon={<FcGoogle />}>
                            <Typography variant='body1'>
                                Join with Google
                            </Typography></LoadingButton>
                        <LoadingButton

                            size='medium' variant='contained' sx={{ textTransform: 'none', marginTop: '20px' }} startIcon=''>
                            <Typography variant='body1'>
                                Join with Faceboook
                            </Typography></LoadingButton>
                    </div>
                    <Typography textAlign={'center'}
                        sx={{ marginBottom: '0px', marginTop: '15px' }}
                    >
                        Don't have an account?
                        <Button onClick={() => {
                            handleClose();
                            Dispatch(setRegisterDialog(true));
                        }}> Create Account.</Button>
                    </Typography>
                </form>
            </div>
        </Dialog>
    )
}