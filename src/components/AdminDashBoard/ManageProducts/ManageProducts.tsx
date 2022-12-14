import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../../Redux/Reducer/ProductsReducer';
import { AppDispatch } from '../../../Redux/Store'
import { useDeleteProductMutation } from '../../../Redux/Api/Api';




export default function ManageProducts() {
    const { filteredProducts } = useSelector((state: any) => state.products)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getProducts())
    })

    const [deleteProduct] = useDeleteProductMutation();

    return (
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
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">Description </TableCell>
                        <TableCell align="right">number of Reviews </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts?.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.Category}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.Description}</TableCell>
                            <TableCell align="right">{row.numReviews}</TableCell>
                            <TableCell align="right" >
                                <div className='flex flex-row'>
                                    <button onClick={
                                        () => {
                                            deleteProduct(row.id)
                                            dispatch(getProducts())
                                        }
                                    } className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
                                    <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>Edit</button>
                                </div>

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}