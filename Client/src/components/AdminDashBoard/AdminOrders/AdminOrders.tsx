import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetOrdersQuery } from '../../../Redux/Api/Api'
import { SingleOrder } from './singleOrder'

export const AdminOrders = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const { data } = useGetOrdersQuery()

    //filter the data of current user only

    return (
        <div>
            <TableContainer
                component={Paper}
                className='mt-10 px-10'
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {data?.products?.map((row: any) => ( */}
                        {data?.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.dname}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>

                                {/* <TableCell align="right">
                                    <select value={row.status} name="state" id="">
                                        <option value="pending">{row.status}</option>
                                        <option value="pending">Pending</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </TableCell> */}
                                <SingleOrder row={row} />

                                <TableCell align="right" >
                                    {/* <div className='flex flex-row'>
                                        <button onClick={
                                            () => {
                                                deleteProduct(row._id)
                                            }
                                        } className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
                                        <button onClick={() => {
                                            dispatch(setUpdateProductDialog(true))
                                            dispatch(setCurrentProduct(row))
                                        }}
                                            className='bg-blue-500 text-white px-2 py-1 rounded-md'>Edit</button>
                                    </div> */}

                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
