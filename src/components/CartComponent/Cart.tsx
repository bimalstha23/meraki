import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { GiCrossMark } from 'react-icons/gi'
import { convertCurrency } from '../../helper/helper'
import { useSelector, useDispatch } from 'react-redux'
import { setCartDialog } from '../../Redux/Reducer'
import { useDeleteCartMutation, useGetCartItemsQuery, useUpdateCartMutation } from '../../Redux/Api/Api'

export const Cart = () => {
  const cartDialog = useSelector((state: any) => state.modals.cartDialog)
  const currentUser = useSelector((state: any) => state.user.currentUser)
  const { data, isLoading, error } = useGetCartItemsQuery(currentUser?.uid)

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setCartDialog(false))
  }

  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const updateIncreaseCart = async (id: any, product: any) => {
    const newqty = product.qty + 1;
    const newcart = {
      id,
      qty: newqty,
      name: product.name,
      price: product.price,
      rating: product.rating,
      productId: product.productId,
      uid: product.uid,
        Image: product.Image

    }
    await updateCart(newcart)
  }

  const updateDecreaseCart = async (id: any, qty: any, product: any) => {

    if (qty <= 1) {
      await deleteCart({ uid: currentUser?.uid, id })
    } else {
      const newqty = product.qty - 1;
      const newcart = {
        id,
        qty: newqty,
        name: product.name,
        price: product.price,
        rating: product.rating,
        productId: product.productId,
        uid: product.uid,
        Image: product.Image
      }
      console.log(newcart);
      await updateCart(newcart)
    }

  }

  const deleteCartHandler = async (id: any) => {
    await deleteCart({ uid: currentUser?.uid, id })
  }

  const totalPrice = data?.reduce((acc: any, item: any) => acc + item.price * item.qty, 0)


  return (
    <Transition.Root show={cartDialog} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose} >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Your Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => handleClose()}
                          >
                            <span className="sr-only">Close panel</span>
                            <GiCrossMark className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">

                          <ul role="list" className="-my-6 divide-y divide-gray-200">

                            {data && 
                              data?.map((product: any) => (
                                <li key={product?.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      alt={product?.name}
                                      src={ product?.Image ? product?.Image[0] : 'https://via.placeholder.com/150' }
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          {product.name}
                                        </h3>
                                        <p className="ml-4">{convertCurrency(product.price)}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex gap-4">

                                        <button
                                          onClick={() => updateDecreaseCart(product?.id, product?.qty, product)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          -
                                        </button>
                                        <p className="text-gray-500">Qty {product.qty}</p>
                                        <button
                                          onClick={() => updateIncreaseCart(product?.id, product)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          onClick={() => deleteCartHandler(product?.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            }

                          </ul>

                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{convertCurrency(totalPrice)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => { }}
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-[#FFBA98] to-[#FCCAB1] transition-allpx-6 py-3 text-base font-medium text-[#121212] shadow-sm "
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-[#FFBA98] hover:text-gray-500"
                            onClick={() => handleClose()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
