export interface Product {
    productName: string;
    quantity: number;
    price: number;
}

export interface Booking {
    date: string ;
    time: string ;
    totalPrice: number;
    orderData: Product[];
    token: String;
    deliveryStatus:boolean;
}

export interface BillProps {
    booking: Booking;
}

export interface Card {
    cardId: string;
    cardType: string;
    password: string;
    familyCount: number;
    familyMembers: string[];
    bookingId:string[];
    currentMonthProductList:Product[];
}