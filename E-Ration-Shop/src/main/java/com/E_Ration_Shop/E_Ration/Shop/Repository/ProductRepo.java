package com.E_Ration_Shop.E_Ration.Shop.Repository;

import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.E_Ration_Shop.E_Ration.Shop.Model.Product;

@Repository
public class ProductRepo {

	public Document getProductList() {
		return MongoDBClient.getCollectionInstance("product").find().first();
	}

	public boolean updateProductMap(List<Product> productList) {
		final Document query = new Document();
		final List<Document> productDocList = new ArrayList<>();
		for (Product product : productList) {
			productDocList.add(new Document().append("productName", product.getProductName())
					.append("quantity", product.getQuantity()).append("price", product.getPrice()));
		}
		Document update = new Document("$set", new Document("productList", productDocList));
		return MongoDBClient.getCollectionInstance("product").updateOne(query, update).wasAcknowledged();
	}
}
