import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/Store';
import { setAddressDialog } from '../../Redux/Reducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddAddressMutation } from '../../Redux/Api/Api';
import { useState } from 'react';
import { SnackBar } from '../SnackBar/SnackBar';
import { Backdrop, CircularProgress } from '@mui/material';

export default function AddAddress() {
    const dispatch = useDispatch<AppDispatch>();
    const [snackbar, setSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addAddress] = useAddAddressMutation();
    const currentUser = useSelector((state: any) => state.user.currentUser)

    const handleClose = () => {
        dispatch(setAddressDialog(false));
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        phone: Yup.number().required('Required').min(10, 'Invalid Phone Number'),
        state: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        landmark: Yup.string().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            state: '',
            city: '',
            address: '',
            landmark: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('sdf')
            const data = {
                ...values, uid: currentUser?.uid
            }
            setLoading(true);
            addAddress(data).then(() => {
                setSnackbar(true);
                setLoading(false);
                handleClose();
            })
        }

    })

    const addressDialog = useSelector((state: any) => state.modals.addressDialog)

    return (
        <div>
            <SnackBar open={snackbar} setOpen={setSnackbar} messege='Address Added' />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog fullWidth open={addressDialog} onClose={handleClose}>
                <div className='flex flex-col   p-5 w-full'>
                    <h1>Add Address</h1>
                    <form action="" onSubmit={

                        formik.handleSubmit
                    }>
                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                autoComplete="email"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.name && formik.errors.name ? (<span className=' text-xs text-red-400 '> {formik.errors.name}  </span>) : null}

                        </div>
                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                autoComplete="phone"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.phone && formik.errors.phone ? (<span className=' text-xs text-red-400 '> {formik.errors.phone}  </span>) : null}

                        </div>
                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                autoComplete="address"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.address && formik.errors.address ? (<span className=' text-xs text-red-400 '> {formik.errors.address}  </span>) : null}

                        </div>

                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                autoComplete="state"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.state && formik.errors.state ? (<span className=' text-xs text-red-400 '> {formik.errors.state}  </span>) : null}

                        </div>
                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                city
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                autoComplete="city"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.city && formik.errors.city ? (<span className=' text-xs text-red-400 '> {formik.errors.city}  </span>) : null}

                        </div>
                        <div className="col-span-6 sm:col-span-4 w-full">
                            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                                LandMark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                id="landmark"
                                value={formik.values.landmark}
                                onChange={formik.handleChange}
                                autoComplete="landmark"
                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formik.touched.landmark && formik.errors.landmark ? (<span className=' text-xs text-red-400 '> {formik.errors.landmark}  </span>) : null}
                        </div>
                        <button type='submit' className='mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-lg'>
                            Add Address
                        </button>
                    </form>

                </div>
            </Dialog>
        </div>
    );
}