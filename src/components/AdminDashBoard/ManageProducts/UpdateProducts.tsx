import React, { useState } from 'react';
import { AppBar, Backdrop, Button, CircularProgress, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { SnackBar } from '../../SnackBar/SnackBar';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useGetCategoriesQuery, useUpdateProductsMutation } from '../../../Redux/Api/Api';
import { UploadImage } from '../AddProducts/UploadImages/UploadImage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { sellerStorage } from '../../../config/firebase';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateProductDialog } from '../../../Redux/Reducer';
import { TransitionProps } from '@mui/material/transitions';



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const UpdateProducts = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data } = useGetCategoriesQuery();
    const [fileList, setFileList] = useState<any>([]);
    const dispatch = useDispatch();
    const updateProductDialog = useSelector((state: any) => state.modals.updateProductDialog)
    const currentProduct = useSelector((state: any) => state.product.currentProduct)
    const { name, price, Description, Category, tags, Image: productImage, id } = currentProduct;

    const [updateProduct] = useUpdateProductsMutation();
    const handleClose = () => {
        dispatch(setUpdateProductDialog(false))
    }

    type initialValues = {
        productName: string,
        productPrice: number,
        productDescription: string,
        productCategory: string,
        productTags: string

    }
    const formvalidation = yup.object().shape({
        productName: yup.string().required(),
        productPrice: yup.number().positive().required(),
        productDescription: yup.string().required(),
        productCategory: yup.string().required(),
        productTags: yup.string().required()
    })

    const tagsArray = tags?.join(" ");
    const initalvalues: initialValues = {
        productName: name,
        productPrice: price,
        productDescription: Description,
        productCategory: Category,
        productTags: tagsArray
    }


    const formik = useFormik({
        initialValues: initalvalues,
        validationSchema: formvalidation,
        enableReinitialize: true,
        onSubmit: async (values: initialValues) => {
            setLoading(true);
            const Image = await uploadImages(fileList);
            const payload = {
                name: values.productName,
                price: values.productPrice,
                Description: values.productDescription,
                Category: values.productCategory,
                tags: values.productTags.split(" "),
                id,
                Image: [...productImage, ...Image]
            }
            console.log(payload);
            updateProduct(payload).then(() => {
                setLoading(false);
                setOpen(true);
            }).catch((err: any) => {
                console.log(err);
                setLoading(false);
            }
            )
        },
    })

    const uploadImages = async (fileList: any[]) => {
        const imageurls = [] as any;
        for (const file of fileList) {
            const storageRef = ref(sellerStorage, `Products/Images${file.name}`);
            await uploadBytesResumable(storageRef, file);
            const imgurl = await getDownloadURL(storageRef);
            imageurls.push(imgurl);
        }
        return imageurls;
    }

    return (
        <Dialog open={updateProductDialog} onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <IoMdCloseCircleOutline />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Update Product
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>

            <div className='flex flex-row gap-10 p-10 w-full'>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>


                <SnackBar open={open} setOpen={setOpen} messege={'Product updated'} />
                <div className='flex flex-col w-full'>
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Product</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>

                    <form action="" onSubmit={(e) => {
                        e.preventDefault()
                        formik.handleSubmit()
                    }}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md p-5">
                            <div className='flex flex-row justify-center items-center  mt-5'>
                                <label htmlFor="search" className=' block bg-white rounded-xl w-full focus-within:text-gray-700'>
                                    Product Name
                                    <input onChange={formik.handleChange} value={formik.values.productName} className='rounded bg-white w-full border p-1 border-gray-300   focus:outline-none' id='productName' name='productName' type="text" placeholder='Mobile Phone' />
                                    {formik.errors.productName && formik.touched.productName ? <span className='text-xs text-red-500'>{formik.errors.productName}</span> : null}
                                </label>
                            </div>


                            <div className='flex flex-row justify-center items-center  mt-5'>
                                <label htmlFor="search" className=' block bg-white rounded-xl w-full focus-within:text-gray-700'>
                                    Product Price (Rs)
                                    <input onChange={formik.handleChange} value={formik.values.productPrice} className='rounded bg-white w-full border p-1 border-gray-300   focus:outline-none' id='productPrice' name='productPrice' type="number" placeholder='30000' />
                                    {formik.errors.productPrice && formik.touched.productPrice ? <span className='text-xs text-red-500'>{formik.errors.productPrice}</span> : null}

                                </label>
                            </div>

                            <div className='flex flex-row justify-center items-center  mt-5'>
                                <label htmlFor="category" className=' block bg-white rounded-xl w-full focus-within:text-gray-700'>
                                    Product Category:
                                    <br />
                                    <select onChange={formik.handleChange} name={'productCategory'} value={formik.values.productCategory} className='block bg-white rounded-xl w-full focus-within:text-gray-700' >
                                        <option value=''>Select Category</option>
                                        {data?.map((item: any) => {
                                            return <option>{item.name}</option>
                                        })}
                                    </select>
                                    {formik.errors.productCategory && formik.touched.productCategory ? <span className='text-xs text-red-500'>{formik.errors.productCategory}</span> : null}

                                </label>
                            </div>

                            <div className='flex flex-row justify-center items-center  mt-5'>
                                <label htmlFor="producttags" className=' block bg-white rounded-xl w-full focus-within:text-gray-700'>
                                    Product tags (give space after one tag)
                                    <input onChange={formik.handleChange} value={formik.values.productTags} className='rounded bg-white w-full border p-1 border-gray-300   focus:outline-none' id='productTags' name='productTags' type="string" placeholder='tags' />
                                    {formik.errors.productTags && formik.touched.productTags ? <span className='text-xs text-red-500'>{formik.errors.productTags}</span> : null}
                                </label>

                            </div>

                            <div className='flex flex-row justify-center items-center  mt-5'>
                                <label htmlFor="productDescription" className=' block bg-white rounded-xl w-full focus-within:text-gray-700'>
                                    Product Description
                                    <textarea onChange={formik.handleChange} value={formik.values.productDescription} className='rounded bg-white w-full border p-1 border-gray-300   focus:outline-none' id='productDescription' name='productDescription' placeholder='Best mobile Phone on the town ' />

                                    {formik.errors.productDescription && formik.touched.productDescription ? <span className='text-xs text-red-500'>{formik.errors.productDescription}</span> : null}
                                </label>
                            </div>
                            <button type='submit' className='mt-3 bg-gradient-to-tr from-[#FDC1A2] to-[#FFEFE8] w-32 py-2 rounded-lg'>submit</button>
                        </div>
                    </form>
                </div>
                <div className='w-full'>
                    <UploadImage Image={currentProduct.Image} fileList={fileList} setFileList={setFileList} />
                </div>
            </div>
        </Dialog >
    )
}
