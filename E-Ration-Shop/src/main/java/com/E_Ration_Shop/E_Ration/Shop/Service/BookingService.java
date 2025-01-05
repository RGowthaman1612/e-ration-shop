package com.E_Ration_Shop.E_Ration.Shop.Service;

import java.util.List;
import java.util.ArrayList;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.E_Ration_Shop.E_Ration.Shop.Model.Booking;
import com.E_Ration_Shop.E_Ration.Shop.Repository.BookingRepo;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.mongodb.client.FindIterable;

@Service
public class BookingService {
	private final BookingRepo bookingRepo;
	private final Logger log = LoggerFactory.getLogger(BookingService.class);
    @Autowired
    public BookingService(BookingRepo bookingRepo) {
        this.bookingRepo = bookingRepo;
    }
	
	public ObjectId bookOrder(Booking booking) {
		return bookingRepo.bookOrder(booking);
	}

	public List<Booking> getBooking(List<String> bookingId){
		final FindIterable<Document> bookingsDoc = bookingRepo.getBooking(bookingId);
		final List<Booking> bookings=new ArrayList<>();
		for(Document bookingDoc:bookingsDoc) {
			List<Product> productList=new ArrayList<>();
			for(Document productDoc:bookingDoc.getList("products",Document.class)) {
				productList.add(new Product(productDoc.getString("productName"),productDoc.getInteger("quantity"),productDoc.getInteger("price")));
			}
			Booking booking=new Booking(productList,bookingDoc.getString("date"),bookingDoc.getString("time"),bookingDoc.getInteger("totalPrice").intValue(),bookingDoc.getString("token"),bookingDoc.getBoolean("deliveryStatus"));
			bookings.add(booking);
		}
		log.info("Bookings"+bookings);
		return bookings;
	}

	public List<Booking> getBooking() {
		final FindIterable<Document> bookingsDoc = bookingRepo.getBooking();
		final List<Booking> bookings=new ArrayList<>();
		for(Document bookingDoc:bookingsDoc) {
			List<Product> productList=new ArrayList<>();
			for(Document productDoc:bookingDoc.getList("products",Document.class)) {
				productList.add(new Product(productDoc.getString("productName"),productDoc.getInteger("quantity"),productDoc.getInteger("price")));
			}
			Booking booking=new Booking(productList,bookingDoc.getString("date"),bookingDoc.getString("time"),bookingDoc.getInteger("totalPrice").intValue(),bookingDoc.getString("token"),bookingDoc.getBoolean("deliveryStatus"));
			bookings.add(booking);
		}
		log.info("Bookings"+bookings);
		return bookings;
	}

	public boolean updateDeliveryStatus(String token) {
		return bookingRepo.updateDeliveryStatus(token);
	}
}
