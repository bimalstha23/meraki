import { TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useUpdateorderMutation } from '../../../Redux/Api/Api'

export const SingleOrder = (props: any) => {
    const { row } = props
    const [mutate] = useUpdateorderMutation()
    const [state, setState] = useState(row.status)
    
    useEffect(() => {
        mutate({ ...row, status: state, })
    }, [state])

    return (
        <TableCell align="right">
            <select value={state} onChange={(e) => setState(e.target.value)} name="state" id="">
                <option value="pending">{row.status}</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </TableCell>
    )
}
