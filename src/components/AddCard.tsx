import { Button, Grid, TextField } from "@mui/material";
import { useState, ChangeEvent } from "react";
import Model from 'react-modal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card } from "./types";


export const AddUser = () => {
    const navigate = useNavigate();
    const [orderFormVisible, setOrderFormVisible] = useState(true);
    const [cardDetails, setCardDetails] = useState<Card>({
        cardId: '',
        cardType: '',
        password: '',
        familyCount: 0,
        familyMembers: [],
        bookingId:[],
        currentMonthProductList:[]
    });

    const [hasErrors, setHasErrors] = useState(false);
    const close = () => {
        setOrderFormVisible(false);
        navigate('/home');
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCardDetails({
            ...cardDetails,
            [name]: name === 'familyCount' ? Number(value) : value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!cardDetails.cardId || !cardDetails.cardType || !cardDetails.password || cardDetails.familyCount <= 0 || !cardDetails.familyMembers.length) {
            setHasErrors(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5555/api/cards/addCard', cardDetails);
        
            if (response.status === 200) {
                alert('Card added successfully');
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const response = error.response;
                if (response) {
                    if (response.status === 500) {
                        alert('Failed to add card. Please try again.');
                    } else if (response.status === 409) {
                        alert('Card already added');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again.');
                }
                console.error('Axios error adding card:', error);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        } finally {
            close(); 
        }
        
    };

    return (
        <Model isOpen={orderFormVisible} onRequestClose={close}>
            <Grid sx={{ position: 'relative'}}>
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
                    <h1>Add Card Form</h1>
                </Grid>

                <form onSubmit={handleSubmit}>
                    <Grid
                        sx={{
                            '& > :not(style)': { m: 2, width: '35ch' },
                        }}
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <TextField
                            id="outlined-cardId"
                            label="Card ID"
                            name="cardId"
                            variant="outlined"
                            value={cardDetails.cardId}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { fontSize: '1rem' },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '1rem', fontWeight: 'bold' },
                            }}
                            required
                        />

                        <TextField
                            id="outlined-cardType"
                            label="Card Type"
                            name="cardType"
                            variant="outlined"
                            value={cardDetails.cardType}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { fontSize: '1rem' },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '1rem', fontWeight: 'bold' },
                            }}
                            required
                        />

                        <TextField
                            id="outlined-password"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={cardDetails.password}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { fontSize: '1rem' },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '1rem', fontWeight: 'bold' },
                            }}
                            required
                        />

                        <TextField
                            id="outlined-familyCount"
                            label="Family Count"
                            name="familyCount"
                            type="number"
                            variant="outlined"
                            value={cardDetails.familyCount}
                            onChange={handleInputChange}
                            InputProps={{
                                inputProps: { min: 1 },
                                style: { fontSize: '1rem' },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '1rem', fontWeight: 'bold' },
                            }}
                            required
                        />

                        <TextField
                            id="outlined-familyMembers"
                            label="Family Members (Comma Separated)"
                            name="familyMembers"
                            variant="outlined"
                            value={cardDetails.familyMembers.join(', ')}
                            onChange={(e) =>
                                setCardDetails({
                                    ...cardDetails,
                                    familyMembers: e.target.value.split(',').map(member => member.trim())
                                })
                            }
                            InputProps={{
                                style: { fontSize: '1rem' },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '1rem', fontWeight: 'bold' },
                            }}
                            required
                        />
                    </Grid>

                    {hasErrors && (
                        <Grid sx={{ textAlign: 'center', color: 'red', m: 1 }}>
                            <p>Please fill in all fields correctly.</p>
                        </Grid>
                    )}

                    <Grid sx={{ textAlign: 'center', m: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                fontSize: '1rem',
                                padding: '10px 20px',
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Model>
    );
};
