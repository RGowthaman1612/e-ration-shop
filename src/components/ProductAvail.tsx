import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Product } from './types'
import axios from 'axios';
import { useEffect, useState } from 'react';

const cardId = localStorage.getItem('cardId');
let finalcardId:string='';
if (cardId) {
    finalcardId = JSON.parse(cardId);
    console.log(finalcardId);
}
export const ProductAvail = () => {
    useEffect(()=>{
        getProductDetails();
    },[]);
    const[productAvail,setProductAvail]=useState<Product[]>()
    const getProductDetails=async()=>{
        try{
            const response=await axios.get<Product[]>(`http://localhost:5555/api/cards/getCurrentMonthProductMap/${finalcardId}`);
            if(response.status==200){
                setProductAvail(response.data)
            }
        }
        catch(error){
    
        }
    }
    return (
        <Grid container direction="column" spacing={2} padding={2} className='productAvail' >
            <Grid item>
                <h2 >Card Product Details </h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }} >Product Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }} >Quantity</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }} >Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productAvail ? productAvail.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" sx={{ fontSize: 'normal', fontWeight: 'normal' }}>{product.productName}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 'normal', fontWeight: 'normal' }}>{product.quantity}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 'normal', fontWeight: 'normal' }}>Rs.{product.price}</TableCell>
                                </TableRow>
                            )):<TableRow><TableCell colSpan={5} align="center">No Products Details</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    )
}
