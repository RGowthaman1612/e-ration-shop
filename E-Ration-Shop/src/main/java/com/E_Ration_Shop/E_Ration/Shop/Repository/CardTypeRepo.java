package com.E_Ration_Shop.E_Ration.Shop.Repository;

import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.mongodb.client.FindIterable;
@Repository
public class CardTypeRepo {
	public FindIterable<Document> find(String cardType){
		return MongoDBClient.getCollectionInstance("cardType").find(new Document("cardType",cardType));
	}

	public boolean updateProductPrice(Product productDB) {
		Document query=new Document("product.productName",new Document("$eq",productDB.getProductName()));
		Document update=new Document("$set",new Document("product.$.price",productDB.getPrice()));
		return MongoDBClient.getCollectionInstance("cardType").updateMany(query, update).wasAcknowledged();
	}
}
