package com.E_Ration_Shop.E_Ration.Shop.Model;

import java.util.List;

public class Booking {
	private List<Product> orderData;
	private String date;
	private String time;
	private int totalPrice;
	private String token;
	private boolean deliveryStatus;

	public Booking(List<Product> orderData, String date, String time, int totalPrice, String token,
			boolean deliveryStatus) {
		this.orderData = orderData;
		this.date = date;
		this.time = time;
		this.totalPrice = totalPrice;
		this.token = token;
		this.deliveryStatus = deliveryStatus;
	}

	public List<Product> getOrderData() {
		return orderData;
	}

	public void setOrderData(List<Product> orderData) {
		this.orderData = orderData;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(boolean deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
}
