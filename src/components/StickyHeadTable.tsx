{/* <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Token</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Slot Date</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Slot Time</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Total Price</TableCell>
                                <TableCell align="center" sx={{ fontSize: 'large', fontWeight: 'bolder' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.length > 0 ? bookings.slice(-4).map((order, index) => (
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
                                </TableRow>
                            )) : <TableRow><TableCell colSpan={5} align="center">No Bookings</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer> */}