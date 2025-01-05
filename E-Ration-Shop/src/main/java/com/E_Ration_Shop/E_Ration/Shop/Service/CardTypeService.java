package com.E_Ration_Shop.E_Ration.Shop.Service;

import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.springframework.stereotype.Service;

import com.E_Ration_Shop.E_Ration.Shop.Model.CardType;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Repository.CardTypeRepo;

@Service
public class CardTypeService {
	private final CardTypeRepo cardTypeRepo = new CardTypeRepo();

	public CardType find(String cardType) {
		Document dbCardType = cardTypeRepo.find(cardType).first();
		if (dbCardType == null) {
			throw new RuntimeException("Card type not found: " + cardType);
		}

		String cardTypeName = dbCardType.getString("cardType");

		@SuppressWarnings("unchecked")
		List<Document> productDocuments = (List<Document>) dbCardType.get("product");
		List<Product> productList = new ArrayList<>();

		for (Document doc : productDocuments) {
			productList.add(
					new Product(doc.getString("productName"), doc.getInteger("quantity"), doc.getInteger("price")));
		}

		return new CardType(cardTypeName, productList);
	}

	public boolean updateProductPrice(Product productDB) {
		return cardTypeRepo.updateProductPrice(productDB);
		
	}
}
