import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Grid, TextField } from "@mui/material";
import Model from 'react-modal';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';
import { Bill } from './Bill';
import { Booking, Product } from './types';
import { useNavigate } from 'react-router-dom';

const cardId = localStorage.getItem('cardId');
let finalcardId:string='';
if (cardId) {
    finalcardId = JSON.parse(cardId);
    console.log(finalcardId);
}
const nextDay = dayjs().add(1, 'day');
const currentTime = dayjs();
const disableWeekendsAndToday = (date: Dayjs) => {
    const day = date.day();
    const today = dayjs();
    return day === 0 || day === 6 || date.isSame(today, 'day');
};

const Order = () => {
    const [orderFormVisible, setOrderFormVisible] = useState(true);
    const [cardproducts, setcardProducts] = useState<Product[]>([]);
    const [dbproducts, setdbProducts] = useState<Product[]>([]);
    const [currentMonthProducts, setCurrentMonthProducts] = useState<Product[]>([]);
    const [orderData, setOrderData] = useState<{ [key: string]: number }>({});
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(nextDay);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(currentTime);
    const [error, setError] = useState<string | null>(null);
    const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        const fetchcardProducts = async () => {
            try {

                console.log(finalcardId);
                const response = await axios.get<Product[]>(`http://localhost:5555/cardType/product/cardId/${finalcardId}`);
                setcardProducts(response.data);
                console.log("cardProducts received:", response.data);
            } catch (error) {
                console.error("Error fetching cardproducts:", error);
            }
        };

        const fetchdbProducts = async () => {
            try {
                const response = await axios.get<Product[]>(`http://localhost:5555/api/product/productMap`);
                setCurrentMonthProducts(response.data);
                console.log("dbProducts received:", response.data);
            } catch (error) {
                console.error("Error fetching dbproducts:", error);
            }
        };

        const fetchCurrentMonthProducts=async()=>{
            try {
                const response = await axios.get<Product[]>(`http://localhost:5555/api/cards/getCurrentMonthProductMap/${finalcardId}`);
                setdbProducts(response.data);
                console.log("dbProducts received:", response.data);
            } catch (error) {
                console.error("Error fetching dbproducts:", error);
            }
        };
        fetchcardProducts();
        fetchdbProducts();
        fetchCurrentMonthProducts();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrderData(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    };

    const validateForm = () => {
        const exceededItems: string[] = [];
        let hasErrors = false;

        for (const [key, value] of Object.entries(orderData)) {
            const dbProduct = dbproducts.find(product => product.productName === key);
            const currentMonthProduct = currentMonthProducts.find(product => product.productName === key);
            if (dbProduct && currentMonthProduct && value > dbProduct.quantity && value > currentMonthProduct.quantity) {
                exceededItems.push(`${key} (max: ${dbProduct.quantity})`);
                hasErrors = true;
            }
        }

        if (hasErrors) {
            setError(`The following items exceed the available stock: ${exceededItems.join(', ')}.`);
            return false;
        }

        const isAnyProductFilled = Object.values(orderData).some(value => value > 0);
        if (!isAnyProductFilled) {
            setError("Please fill at least one product with a valid quantity.");
            return false;
        }

        if (!selectedDate || !selectedTime) {
            setError("Please select both date and time.");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const formattedDate = dayjs(selectedDate).toDate();
        const formattedTime = dayjs(selectedTime).format('hh:mm A');
        const orderProducts: Product[] = [];
        let totalPrice = 0;

        for (const [key, value] of Object.entries(orderData)) {
            const dbProduct = dbproducts.find(product => product.productName === key);
            if (dbProduct && value > 0) {
                const product: Product = {
                    productName: key,
                    quantity: value,
                    price: dbProduct.price,
                };
                orderProducts.push(product);
                totalPrice += product.price * product.quantity;
            }
        }

        console.log(finalcardId);
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        const bookingData: Booking = {
            orderData: orderProducts,
            date: formattedDate.toDateString(),
            time: formattedTime.toString(),
            totalPrice,
            token: `${finalcardId}${randomNumber}`,
            deliveryStatus:false
        };

        try {
            console.log("Booking data ", bookingData);
            const response = await axios.post(`http://localhost:5555/api/booking/order/${finalcardId}`, bookingData);
            console.log("Response from API:", response.data);
            alert("Order submitted successfully!");
            setSubmittedBooking(bookingData);
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order.");
        }
    };

    const navigate = useNavigate();
    const close = () => {
        setOrderFormVisible(false);
        navigate('/home');
    }

    return (
        <>
            {submittedBooking ? (
                <Bill booking={submittedBooking} />
            ) : (
                <Model isOpen={orderFormVisible} onRequestClose={close} >
                    <Grid sx={{ position: 'relative' }}>
                        <Button
                            onClick={close}
                            sx={{
                                position: 'absolute',
                                top: -30,
                                right: -1,
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

                        <Grid sx={{ textAlign: 'center', m: 2, color: 'slategrey' }}>
                            <h1>Your Order Form</h1>
                        </Grid>
                        <Grid
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 2, width: '25ch', margin: '1.5rem' },
                            }}
                            noValidate
                            autoComplete="on"
                        >
                            {cardproducts.map((product, index) => (
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    key={index}
                                    label={product.productName}
                                    name={product.productName}
                                    variant="outlined"
                                    type="number"
                                    InputProps={{
                                        style: { fontSize: '1.2rem' },
                                        inputProps: {
                                            min: 0,
                                            max: product.quantity,
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: '1.2rem', fontWeight: 'bold' },
                                    }}
                                    onChange={handleInputChange}
                                    required
                                />
                            ))}
                        </Grid>

                        {error && (
                            <Grid sx={{ textAlign: 'center', color: 'red', m: 2 }}>
                                <p>{error}</p>
                            </Grid>
                        )}

                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            setSelectedDate(newValue);
                                        }}
                                        shouldDisableDate={disableWeekendsAndToday}
                                        disablePast
                                    />
                                    <TimePicker
                                        format='hh:mm:ss'
                                        label="Select Time"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        value={selectedTime}
                                        onChange={(newValue) => {
                                            setSelectedTime(newValue);
                                        }}
                                        minTime={currentTime.hour(10).minute(0)}
                                        maxTime={currentTime.hour(16).minute(0)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Button variant="contained" onClick={handleSubmit} style={{ margin: '22px' }}>Submit</Button>
                        </Grid>
                    </Grid>
                </Model>
            )}
        </>
    );
};

export default Order;
