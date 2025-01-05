package com.E_Ration_Shop.E_Ration.Shop.Model;

import java.util.ArrayList;
import java.util.List;

public class CardType {
	private String cardType;
	private List<Product> product = new ArrayList<>();

	public CardType(String cardType, List<Product> productList) {
		this.cardType = cardType;
		this.product = productList;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product =product;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
}
