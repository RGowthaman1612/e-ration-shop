package com.E_Ration_Shop.E_Ration.Shop.Model;

public class Product {
	private String productName;
	private int quantity;
	private int price;

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Product(String productName, int quantity, int price) {
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	@Override
	public String toString() {
		return "Product [productName=" + productName + ", quantity=" + quantity + ", price=" + price + "]";
	}
}
