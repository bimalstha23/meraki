import { Disclosure, Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { AiFillBell, AiFillCloseCircle } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import meraki from '../../assets/meraki.svg'
import { Login } from '../Auth/login'
import { useDispatch, useSelector } from 'react-redux';
import { setCartDialog, setLoginDialog, setUserLoginDetails, } from '../../Redux/Reducer'
import { signOut } from 'firebase/auth'
import { buyerAuth } from '../../config/firebase'
import { Cart } from '../CartComponent/Cart'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { Link, Navigate } from 'react-router-dom'
import {  BiSearchAlt } from 'react-icons/bi'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
};

export const NavBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.user.currentUser);
    const navigation = [
        { name: 'Home', link: '/', current: true },
        { name: 'Products', link: '/products',  current: false },


    ]
    const userNavigation = [

        { name: 'Your Profile', onclick: () => {}, Link:'/profile'},
        { name: 'Settings', onclick: () => { },Link:'' },
        {
            name: 'Sign out', onClick: () => {
               
            },Link:''
        },
    ]


    return (
        <div className='fixed w-full z-50'>
            <Login />
            <Cart />
            <Disclosure as="nav" className="bg-[#FEEAE0]">
                {({ open }) => (
                    <>
                        <div className=" mx-36 max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src={meraki}
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex  justify-center items-baseline space-x-4">
                                            {navigation.map((item , key) => (
                                                <Link
                                                    to={item.link}
                                                    key={key}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <div className='flex flex-row justify-center items-center w-full'>
                                                <form action="">
                                                <label htmlFor="search" className='relative block text-gray-400 bg-white rounded-xl w-full focus-within:text-gray-700'>
                                                    <button type='submit'> <BiSearchAlt size={20} className="pointer-events-none left-1 absolute top-1/2  transform -translate-y-1/2 " /></button>
                                                    <input className='rounded-xl bg-white w-full px-6 py-1 focus:outline-none' id='search' name='search' type="text" placeholder='Search Shop' />
                                                </label>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            onClick={() => dispatch(setCartDialog(true))}
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <RiShoppingCart2Fill className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        {/* Profile dropdown */}

                                        {
                                            currentUser ? (
                                                <Menu as="div" className="relative ml-3">
                                                    <div>
                                                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="sr-only">Open user menu</span>
                                                            <img className="h-8 w-8 rounded-full" src={currentUser.photoURL} alt="" />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {/* {userNavigation.map((item) => (
                                                                <Menu.Item key={item.name}>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={item.onClick}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700 w-full'
                                                                            )}
                                                                        >
                                                                            <Link to={item?.Link}>
                                                                            {item.name}
                                                                            </Link>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))} */}

                                                            <Menu.Item>
                                                                <Link to={'/profile'}
                                                                className='block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100'
                                                                >
                                                                    {/* <Link to='/profile'> */}
                                                                        Profile
                                                                    {/* </Link> */}
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link to={'/profile/settings'}
                                                                className='block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100'
                                                                >
                                                                        Settings
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button
                                                                onClick={() => {
                                                                    dispatch(setUserLoginDetails(null));
                                                                    signOut(buyerAuth);
                                                                }}
                                                                className='block px-4 py-2 text-start text-sm text-gray-700 w-full hover:bg-gray-100'
                                                                >
                                                                        SignOut
                                                                </button>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            ) : <button onClick={() => {
                                                dispatch(setLoginDialog(true));
                                            }}>Login</button>}
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <AiFillCloseCircle className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <FaBars className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                {navigation.map((item) => (
                                    <Link to={item.link}>
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pt-4 pb-3">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={currentUser?.photoURL} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{currentUser?.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{currentUser?.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <RiShoppingCart2Fill className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={item.onClick}
                                            className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

        </div>
    )
}
