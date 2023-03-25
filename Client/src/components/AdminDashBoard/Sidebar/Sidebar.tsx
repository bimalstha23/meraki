import React, { useEffect, useState } from 'react';
import meraki from '../../../assets/meraki.svg'
import { RiSettingsFill } from 'react-icons/ri';
import { SiGoogletagmanager } from 'react-icons/si';
import { AiFillShop } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FaShoppingBag } from 'react-icons/fa';
import { MdProductionQuantityLimits, MdSpaceDashboard } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [display, setDisplay] = useState<string>('hidden')

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const display: string = open ? 'block' : 'hidden';
        setDisplay(display);
    }, [open]);

    return (
        <div className='w-64 h-screen border-r-2' >
            <div className=" overflow-y-auto flex flex-col justify-between py-4 pl-3 h-full bg-gray-50 rounded dark:bg-gray-800">
                <a href="#" className="flex items-center justify-center pl-2.5 border-r-2 border-b-2 rounded-br-3xl">
                    <img src={meraki} />
                </a>

                <ul className="space-y-2 border-r-2 rounded-r-3xl h-full py-5">
                    <li>
                        <Link to={'/sellerDashBoard/'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MdSpaceDashboard />
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleToggle} type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
                            <FaShoppingBag />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap" >Products</span>
                            <RiArrowDropDownLine size={35} />
                        </button>

                        <ul
                            className={display}
                        >
                            <li>
                                <Link to={'/sellerDashBoard/AddProducts'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <AiFillShop />
                                    <span className="ml-3">Add Products</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/sellerDashBoard/ManageProducts'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <SiGoogletagmanager />
                                    <span className="ml-3">Manage Products</span>
                                </Link>
                            </li>

                        </ul>
                    </li>
                    <li>
                        <Link to={'/sellerDashBoard/orders'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MdProductionQuantityLimits />
                            <span className="ml-3">Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/sellerDashBoard/Settings'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <RiSettingsFill />
                            <span className="ml-3">Settings</span>
                        </Link>
                    </li>
                </ul>
                <ul className=' border-t-2 border-r-2 rounded-tr-3xl py-5'>
                    <li>
                        <Link to={'/'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="ml-3">Send help</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="ml-3">Contact us</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={(e) => { }} type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <FiLogOut />
                            <span className="ml-3">LogOut</span>
                        </button>
                    </li>
                </ul>

            </div>
        </div>

    )
}