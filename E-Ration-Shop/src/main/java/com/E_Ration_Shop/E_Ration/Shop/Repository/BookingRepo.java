package com.E_Ration_Shop.E_Ration.Shop.Repository;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.E_Ration_Shop.E_Ration.Shop.Model.Booking;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.mongodb.client.FindIterable;

@Repository
public class BookingRepo {
	private final Logger log = LoggerFactory.getLogger(BookingRepo.class);
	public ObjectId bookOrder(Booking booking) {
		final List<Document> productDocList = new ArrayList<>();
		for (Product product : booking.getOrderData()) {
			productDocList.add(new Document().append("productName", product.getProductName())
					.append("quantity", product.getQuantity()).append("price", product.getPrice()));
		}
		Document doc = new Document().append("token", booking.getToken()).append("products", productDocList)
				.append("date", booking.getDate()).append("time", booking.getTime())
				.append("totalPrice", booking.getTotalPrice())
				.append("deliveryStatus", booking.getDeliveryStatus());
		return MongoDBClient.getCollectionInstance("booking").insertOne(doc).getInsertedId().asObjectId().getValue();

	}

	public FindIterable<Document> getBooking(List<String> bookingId) {
		final List<ObjectId> bookingIdList=new ArrayList<>();
		for(String id:bookingId) {
			log.info(id);
			bookingIdList.add(new ObjectId(id));
		}
		Document query=new Document("_id",new Document("$in",bookingIdList));
		log.info(MongoDBClient.getCollectionInstance("booking").find(query).toString());
		return MongoDBClient.getCollectionInstance("booking").find(query);
		
	}
	public FindIterable<Document> getBooking() {
		log.info(MongoDBClient.getCollectionInstance("booking").find().toString());
		return MongoDBClient.getCollectionInstance("booking").find();
		
	}

	public boolean updateDeliveryStatus(String token) {
		final Document query=new Document("token",token);
		final Document update=new Document("$set",new Document("deliveryStatus",true));
		return MongoDBClient.getCollectionInstance("booking").updateOne(query, update).wasAcknowledged();
	}


}
