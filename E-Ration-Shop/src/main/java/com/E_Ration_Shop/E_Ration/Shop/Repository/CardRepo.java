package com.E_Ration_Shop.E_Ration.Shop.Repository;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.E_Ration_Shop.E_Ration.Shop.Model.Card;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;

@Repository
public class CardRepo {
	public Document findCard(String cardId) {
		return MongoDBClient.getCollectionInstance("card").find(new Document("cardId",cardId)).first();
	}

	public boolean addCard(Card card) {
		final List<Document> productDocList = new ArrayList<>();
		for (Product product : card.getCurrentMonthProductList()) {
			productDocList.add(new Document().append("productName", product.getProductName())
					.append("quantity", product.getQuantity()).append("price", product.getPrice()));
		}
		Document newCard = new Document().append("cardId", card.getCardId()).append("cardType", card.getCardType())
				.append("password", card.getPassword()).append("familyCount", card.getFamilyCount())
				.append("familyMembers", card.getFamilyMembers())
				.append("bookingId", new ArrayList<String>())
				.append("isFirstTimeLogin", card.getIsFirstTimeLogin())
				.append("currentMonthProductList", productDocList);
		return MongoDBClient.getCollectionInstance("card").insertOne(newCard).wasAcknowledged();
	}

	public boolean updateBookingId(Card card) {
		Document query=new Document("cardId",card.getCardId());
		List<String>cardBookIdList= card.getBookings();
		Document update=new Document("$push",new Document("bookingId",cardBookIdList.get(cardBookIdList.size() - 1)));
		return MongoDBClient.getCollectionInstance("card").updateOne(query, update).wasAcknowledged();
	}

	public List<String> getBookingId(String cardId) {
		Document query=new Document("cardId",cardId);
		return MongoDBClient.getCollectionInstance("card").find(query).first().getList("bookingId", String.class);
	}

	public boolean IsFirstTimeLogin(String cardId) {
		Document query=new Document("cardId",cardId);
		return MongoDBClient.getCollectionInstance("card").find(query).first().getBoolean("isFirstTimeLogin");
	}

	public boolean changePassword(Card card) {
		Document query=new Document("cardId",card.getCardId());
		Document update=new Document("$set",new Document("password",card.getPassword()).append("isFirstTimeLogin", card.getIsFirstTimeLogin()));
		return MongoDBClient.getCollectionInstance("card").updateOne(query, update).wasAcknowledged();
	}
	
	public boolean updateCurrentMonthProductList(Card card) {
		Document query=new Document("cardId",card.getCardId());
		final List<Document> productDocList = new ArrayList<>();
		for (Product product : card.getCurrentMonthProductList()) {
			productDocList.add(new Document().append("productName", product.getProductName())
					.append("quantity", product.getQuantity()).append("price", product.getPrice()));
		}
		Document update=new Document("$set",new Document("currentMonthProductList",productDocList));
		return MongoDBClient.getCollectionInstance("card").updateOne(query, update).wasAcknowledged();
	}

	@SuppressWarnings("unchecked")
	public List<Document> getCurrentMonthProductList(String cardId) {
		Document query=new Document("cardId",cardId);
		return (List<Document>) MongoDBClient.getCollectionInstance("card").find(query).first().get("currentMonthProductList");
	}

}
