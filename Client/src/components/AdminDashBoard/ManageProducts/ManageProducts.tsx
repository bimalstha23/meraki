import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../Redux/Api/Api';
import { UpdateProducts } from './UpdateProducts';
import { useDispatch } from 'react-redux';
import { setCurrentProduct, setUpdateAddressDialog, setUpdateProductDialog } from '../../../Redux/Reducer';


export default function ManageProducts() {
    const { data } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const dispatch = useDispatch();

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
                    {/* {data?.products?.map((row: any) => ( */}
                    {data?.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.price / 100}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.numReviews}</TableCell>
                            <TableCell align="right" >
                                <div className='flex flex-row'>
                                    <button onClick={
                                        () => {
                                            deleteProduct(row._id)
                                        }
                                    } className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
                                    <button onClick={() => {
                                        console.log(row.slug)
                                        dispatch(setUpdateProductDialog(true))
                                        dispatch(setCurrentProduct(row))
                                    }}
                                        className='bg-blue-500 text-white px-2 py-1 rounded-md'>Edit</button>
                                </div>

                            </TableCell>
                            <UpdateProducts />
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}