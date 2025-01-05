import React, { useState } from 'react';
import { BillProps } from './types';
import Model from 'react-modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export const Bill: React.FC<BillProps> = ({ booking }) => {
    const [orderFormVisible, setOrderFormVisible] = useState(true);
    const navigate = useNavigate();
    console.log(booking)
    const close = () => {
        setOrderFormVisible(false);
        navigate('/home');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Model isOpen={orderFormVisible} onRequestClose={close}>
            <Grid container direction="column" spacing={2} padding={2}>
                <Button
                    onClick={close}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 5,
                        minWidth: 'auto',
                        padding: '8px',
                        lineHeight: 1,
                        fontSize: '3rem',
                        color: 'black',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    &times;
                </Button>
                <Grid item>
                    <h1>Bill Details</h1>
                </Grid>
                <Grid item>
                    <p>Date: {booking.date}</p>
                </Grid>
                <Grid item>
                    <p>Time: {booking.time}</p>
                </Grid>
                <Grid item>
                    <p>Total Price: Rs.{booking.totalPrice}</p>
                </Grid>
                <Grid item>
                    <p>Delivery Status: {booking.deliveryStatus?"Delivered":"Not Delivered"}</p>
                </Grid>
                <Grid item>
                    <p>Token: {booking.token}</p>
                </Grid>
                <Grid item>
                    <h2>Order Details</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(booking.orderData || []).map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {product.productName}
                                        </TableCell>
                                        <TableCell align="right">{product.quantity}</TableCell>
                                        <TableCell align="right">Rs.{product.price}</TableCell>
                                        <TableCell align="right">Rs.{product.price * product.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handlePrint}>
                        Print Bill
                    </Button>
                </Grid>
            </Grid>
        </Model>
    );
};
