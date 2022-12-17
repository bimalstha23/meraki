import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';

export const Profile = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state: any) => state.user.userDetails);
    const firstName = userDetails?.displayName?.split(' ').slice(0, -1).join(' ');
    const lastName = userDetails?.displayName?.split(' ').slice(-1).join(' ');
     const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            email: userDetails?.email,
            phone: userDetails?.phone,
        
        },
        enableReinitialize:true,
        onSubmit: (values) => {
            console.log(values);

        }
     })


    return (
        <div>
            <div className="mt-5 w-full h-[100px]">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                    
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        value={formik.values.firstName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastNname"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange = {formik.handleChange}
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email-address"
                        value={formik.values.email}
                        onChange = {formik.handleChange}
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                

          

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={formik.values.phone}
                        onChange = {formik.handleChange}

                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          </div>
    )
}
