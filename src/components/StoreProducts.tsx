import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "./types";
import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export const StoreProducts = () => {
    const [dbProducts, setdbProducts] = useState<Product[]>([]);

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = async () => {
        try {
            const response = await axios.get<Product[]>(`http://localhost:5555/api/product/productMap`);
            setdbProducts(response.data);
            console.log("dbProducts received:", response.data);
        } catch (error) {
            console.error("Error fetching dbproducts:", error);
        }
    };

    return (
        <Grid container spacing={2} padding={2} className="orderDetails">
            <Grid item xs={12}>
                <h2>Product Details</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Product Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Quantity</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dbProducts.length > 0 ? dbProducts.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{product.productName}</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="center">Rs.{product.price}</TableCell>
                                </TableRow>
                            )) : <TableRow><TableCell colSpan={5} align="center">No Products</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
