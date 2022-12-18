import React, { useState } from 'react'
import { UploadImage } from './UploadImages/UploadImage'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useGetCategoriesQuery } from '../../../Redux/Api/Api';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { sellerStorage } from '../../../config/firebase';
import axios from 'axios';
import { SnackBar } from '../../SnackBar/SnackBar';
import { Backdrop, CircularProgress } from '@mui/material';



export const AddProducts = () => {
  const { data } = useGetCategoriesQuery()
  const [fileList, setFileList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const initalvalues: initialValues = {
    productName: '',
    productPrice: 0,
    productDescription: '',
    productCategory: '',
    productTags: ''
  }

  const formik = useFormik({
    initialValues: initalvalues,
    validationSchema: formvalidation,
    onSubmit: async (values: initialValues) => {
      if (fileList) {
        setLoading(true);
        const imageurls = await uploadImages(fileList);
        axios({
          method: 'post',
          url: 'http://localhost:3000/products/',
          data: {
            tags: values.productTags.split(" "),
            name: values.productName,
            price: values.productPrice * 100,
            Description: values.productDescription,
            Category: values.productCategory,
            Image: imageurls,
            numReviews: 0,
            rating: 0,
          }
        }).then((res) => {
          setLoading(false);
          setOpen(true)
        }).catch(e => console.log(e))
      }
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
    <div className='flex flex-row gap-10 p-10 w-full'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <SnackBar open={open} setOpen={setOpen} messege={'Product added'} />
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
          <div className="shadow sm:overflow-hidden sm:rounded-md px-5">
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
            <button type='submit'>submit</button>
          </div>

        </form>
      </div>
      <div className='w-full'>
        <UploadImage fileList={fileList} setFileList={setFileList} />
      </div>
    </div >
  )
}