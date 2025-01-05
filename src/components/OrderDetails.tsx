import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination, Tooltip, IconButton, InputBase, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Bill } from "./Bill";
import { Booking } from "./types";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const cardId = localStorage.getItem('cardId');
const finalcardId = cardId ? JSON.parse(cardId) : '';

export const OrderDetails = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State to hold search query

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = async () => {
        try {
            if (finalcardId === "admin") {
                const bookingsResponse = await axios.get(`http://localhost:5555/api/booking/getOrder/admin`);
                setBookings(bookingsResponse.data);
                console.log(bookingsResponse.data);
            }
            else {
                const bookingIdResponse = await axios.get(`http://localhost:5555/api/cards/getBookingId/${finalcardId}`);
                const bookingsResponse = await axios.get(`http://localhost:5555/api/booking/getOrder/${bookingIdResponse.data}`);
                setBookings(bookingsResponse.data);
                console.log(bookingsResponse.data);
            }
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
    };

    const callBill = (order: Booking) => {
        setSelectedOrder(null);
        setTimeout(() => setSelectedOrder(order), 0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };


    const filteredBookings = searchQuery
        ? bookings.filter((order) =>
            order.token.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : bookings;

    interface Column {
        id: 'token' | 'date' | 'time' | 'totalPrice' | 'action' | 'deliveryStatus';
        label: string;
        align?: 'center';
    }

    const columns: readonly Column[] = finalcardId === "admin"
        ? [
            { id: 'token', label: 'Token', align: 'center' },
            { id: 'date', label: 'Slot Date', align: 'center' },
            { id: 'time', label: 'Slot Time', align: 'center' },
            { id: 'totalPrice', label: 'Total Price', align: 'center' },
            { id: 'action', label: 'Action', align: 'center' },
            { id: 'deliveryStatus', label: 'Update Status', align: 'center' },
        ]
        : [
            { id: 'token', label: 'Token', align: 'center' },
            { id: 'date', label: 'Slot Date', align: 'center' },
            { id: 'time', label: 'Slot Time', align: 'center' },
            { id: 'totalPrice', label: 'Total Price', align: 'center' },
            { id: 'action', label: 'Action', align: 'center' },
        ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const updateDeliveryStatus = async (token: String) => {
        try {
            const response = await axios.post(`http://localhost:5555/api/booking/updateDeliveryStatus/${token}`);
            if (response.status == 200) {
                alert("Delivery Status Updated");
                getOrderDetails();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response ? error.response.status : "Network Error";
                console.error("Cannot update delivery status:", status);
                if (status === 113) {
                    alert("Cannot update delivery status");
                }
            } else {
                alert("Cannot update delivery status");
            }
        }
    };
    return (
        <Grid container spacing={2} padding={2} className="orderDetails">
            <Grid item xs={12}>
                <h2>Order Details</h2>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid #c2c1c1',
                        borderRadius: '10px',
                        width: '100%',
                        padding: '0 8px',
                        mb: 2
                    }}
                >
                    <InputBase
                        sx={{ flex: 1, ml: 1 }}
                        placeholder="Search By Token"
                        inputProps={{ 'aria-label': 'search token' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{
                        maxHeight: 440, '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{ fontSize: 'large', fontWeight: 'bolder' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredBookings.length > 0 ? filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{order.token}</TableCell>
                                        <TableCell align="center">{order.date}</TableCell>
                                        <TableCell align="center">{order.time}</TableCell>
                                        <TableCell align="center">Rs.{order.totalPrice}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="inherit" onClick={() => callBill(order)}>
                                                View
                                            </Button>
                                        </TableCell>
                                        {finalcardId === 'admin' && (
                                            <TableCell align="center">
                                                {order.deliveryStatus ? <Tooltip arrow title="Delivered">
                                                    <div>
                                                        <Button variant="contained" color="inherit" disabled>
                                                            <CancelIcon />
                                                        </Button>
                                                    </div>
                                                </Tooltip> : <Tooltip arrow title="Set to Delivered">
                                                    <Button variant="contained" color="inherit" onClick={() => updateDeliveryStatus(order.token)}> <CheckCircleIcon /></Button>
                                                </Tooltip>}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )) : <TableRow><TableCell colSpan={6} align="center">No Bookings</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={filteredBookings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                {selectedOrder && <Bill booking={selectedOrder} />}
            </Grid>
        </Grid>
    );
};
