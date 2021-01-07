import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

import { ACTIONS } from '../../../../constants';
import AppContext from '../../../../AppContext';

const ProductsTable = () => {
    const [{ products }, dispatch] = useContext(AppContext);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Price $</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map(({ id, name, price }, index) => (
                    <TableRow key={id}>
                        <TableCell component="th" scope="row">
                            {name}
                        </TableCell>
                        <TableCell align="right">{price}</TableCell>
                        <TableCell align="right">{
                            <Button onClick={() => {
                                dispatch({
                                    type: ACTIONS.ADD_PRODUCT_TO_CART,
                                    payload: {
                                        index,
                                    }
                                });
                            }
                            }>Buy</Button>
                        }</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductsTable;
