package com.E_Ration_Shop.E_Ration.Shop.Controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.E_Ration_Shop.E_Ration.Shop.Model.Booking;
import com.E_Ration_Shop.E_Ration.Shop.Model.Card;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Service.BookingService;
import com.E_Ration_Shop.E_Ration.Shop.Service.CardService;
import com.E_Ration_Shop.E_Ration.Shop.Service.ProductService;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class BookController {
	@Autowired
	private BookingService bookingService;
	private final Logger log = LoggerFactory.getLogger(BookController.class);

	@PostMapping("/order/{cardId}")
	public ResponseEntity<Object> order(@RequestBody  @NotNull Booking booking, @PathVariable String cardId) {
		log.info("card id "+cardId);
		log.info(booking.getOrderData().toString());
		for(Product product:booking.getOrderData()) {
			log.info(product.toString());
		}
		final ObjectId bookingId = bookingService.bookOrder(booking);
		final CardService cardService = new CardService();
		final Card card = cardService.findCard(cardId);
		final ProductService productService = new ProductService();
		card.addBookings(bookingId.toString());
		if (cardService.updateBookingId(card) && cardService.updateCurrentMonthProduct(card,booking.getOrderData())&& productService.reduceProductMap(booking.getOrderData())) {
			log.info("Booked Order: {}", booking.getOrderData());
			log.info("Date: {}", booking.getDate());
			log.info("Time: {}", booking.getTime());
			return ResponseEntity.status(HttpStatus.OK).body(booking);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(booking);
		}
	}
	
	@GetMapping("/getOrder/{bookingId}")
	public  ResponseEntity<Object> getBooking(@PathVariable List<String> bookingId){
		log.info("Booking id"+bookingId);
		return ResponseEntity.status(HttpStatus.OK).body(bookingService.getBooking(bookingId));
		
	}
	@GetMapping("/getOrder/admin")
	public  ResponseEntity<Object> getBooking(){
		log.info("Admin reading Bookings");
		return ResponseEntity.status(HttpStatus.OK).body(bookingService.getBooking());
		
	}@PostMapping("/updateDeliveryStatus/{token}")
	public ResponseEntity<Object> updateDeliveryStatus(@PathVariable String token){
		log.info("Token Delivery Status is updating "+token);
		if(bookingService.updateDeliveryStatus(token)) {
			return ResponseEntity.status(HttpStatus.OK).body("Delivery Status Updated");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Delivery Status Cannot Updated");
	}
}
