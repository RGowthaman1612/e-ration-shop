package com.E_Ration_Shop.E_Ration.Shop.Service;

import java.util.*;
import java.util.Map.Entry;

import org.bson.Document;
import com.E_Ration_Shop.E_Ration.Shop.Model.Card;
import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Repository.CardRepo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class CardService {

	private CardRepo cardRepo=new CardRepo();
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public Card findCard(String cardId) {
		Document dbCard = cardRepo.findCard(cardId);
		if (dbCard != null) {
			if(cardId.equals("admin")) {
				Card card=new Card();
				card.setCardId(cardId);
				card.setPassword(dbCard.getString("password"));
				return card;
			}
			@SuppressWarnings({ "unchecked" })
			final List<Document> productDocuments = (List<Document>) dbCard.get("currentMonthProductList");
			List<Product>productList=new ArrayList<>();
			if(!productDocuments.isEmpty()) {
				for (Document doc : productDocuments) {
					productList.add(new Product(doc.getString("productName"), doc.getInteger("quantity"), doc.getInteger("price")));
				}
			}
			return new Card(dbCard.getString("cardId"), dbCard.getString("password"), dbCard.getInteger("familyCount"),
					dbCard.getList("familyMembers", String.class), dbCard.getString("cardType"),dbCard.getList("bookingId", String.class),dbCard.getBoolean("isFirstTimeLogin"),productList);
		}
		return null;  
	}

	public boolean addCard(Card card) {
		card.setPassword(passwordEncoder.encode(card.getPassword()));
		card.setFirstTimeLogin(true);
		return cardRepo.addCard(card);
	}

	public boolean verifyCard(Card card) {
		final Card dbCard = findCard(card.getCardId());
		if (dbCard != null) {
			return passwordEncoder.matches(card.getPassword(), dbCard.getPassword());
		}
		return false;
	}

	public String findCardType(String cardId) {
		return findCard(cardId).getCardType();		
	}

	public boolean updateBookingId(Card card) {
		return cardRepo.updateBookingId(card);	
	}

	public List<String> getBookingId(String cardId) {
			return cardRepo.getBookingId(cardId);
	}

	public boolean IsFirstTimeLogin(Card card) {
		return cardRepo.IsFirstTimeLogin(card.getCardId());
	}

	public boolean changePassword(Card card) {
		card.setPassword(passwordEncoder.encode(card.getPassword()));
		card.setFirstTimeLogin(false);
		return cardRepo.changePassword(card);
	}
	
	public Map<String,Product> getCurrentMonthProductMap(String cardId){
		final List<Document> currentMonthProductList=cardRepo.getCurrentMonthProductList(cardId);
		final Map<String,Product> currentMonthProductMap=new HashMap<>();
		for(Document doc:currentMonthProductList) {
			currentMonthProductMap.put(doc.getString("productName"),
					new Product(doc.getString("productName"), doc.getInteger("quantity"), doc.getInteger("price")));
		}
		return currentMonthProductMap;
	}

	@SuppressWarnings("unused")
	public List<Product> getCurrentMonthProductList(String cardId) {
		final Map<String,Product> currentMonthProductMap=getCurrentMonthProductMap(cardId);
		final List<Product> currentMonthProductList=new ArrayList<>();
		for(Entry<String, Product> map: currentMonthProductMap.entrySet()){
			currentMonthProductList.add(map.getValue());
		}
		return currentMonthProductList;
	}

	public boolean updateCurrentMonthProduct(Card card,List<Product> orderData) {
		final Map<String,Product>currentMonthProductMap=getCurrentMonthProductMap(card.getCardId());
		final List<Product> currentMonthProductList=new ArrayList<>();
		card.setCurrentMonthProductList(currentMonthProductList);
		for(Product product:orderData) {
			final Product currentMonthProduct=currentMonthProductMap.get(product.getProductName());
			currentMonthProduct.setPrice(product.getPrice());
			currentMonthProduct.setQuantity(product.getQuantity());
			currentMonthProductList.add(currentMonthProduct);
		}
		return cardRepo.updateCurrentMonthProductList(card);
	}
}
