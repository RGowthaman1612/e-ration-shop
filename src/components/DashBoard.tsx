import { Grid } from "@mui/material";
import { OrderDetails } from "./OrderDetails";
import { ProductAvail } from "./ProductAvail";
import { StoreProducts } from "./StoreProducts";

const cardId = localStorage.getItem('cardId');
let finalcardId: string = '';
if (cardId) {
    finalcardId = JSON.parse(cardId);
    console.log(finalcardId);
}
export const DashBoard = () => {
    return (
        <Grid container className="dashBoard">
            <Grid item xs={7}>
                <OrderDetails />
                {finalcardId !== "admin" && <><ProductAvail /></>}
            </Grid>
            <Grid item xs={5}>
            <StoreProducts />
            </Grid>
        </Grid>
    );
};
