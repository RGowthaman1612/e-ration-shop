package com.E_Ration_Shop.E_Ration.Shop.Model;

import java.util.ArrayList;
import java.util.List;

public class Card {
	private String cardId;
	private String password;
	private int familyCount;
	private List<String> familyMembers = new ArrayList<>();
	private String cardType;
	private List<String> bookingId = new ArrayList<>();
	private List<Product> currentMonthProductList=new ArrayList<>();
	private boolean isFirstTimeLogin=false;

	public Card(String cardId, String password, int familyCount, List<String> familyMembers, String cardType,
			List<String> bookingId, boolean isFirstTimeLogin,List<Product> currentMonthProductList) {
		this.cardId = cardId;
		this.password = password;
		this.familyCount = familyCount;
		this.familyMembers = familyMembers;
		this.cardType = cardType;
		this.bookingId = bookingId;
		this.isFirstTimeLogin = isFirstTimeLogin;
		this.currentMonthProductList=currentMonthProductList;
	}

	public Card(String cardId, String password, int familyCount, List<String> familyMembers, String cardType,
			List<String> bookingId) {
		this.cardId = cardId;
		this.password = password;
		this.familyCount = familyCount;
		this.familyMembers = familyMembers;
		this.cardType = cardType;
		this.bookingId = bookingId;
	}
	
	public Card() {
		//default constructor
	}
	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getFamilyCount() {
		return familyCount;
	}

	public void setFamilyCount(int familyCount) {
		this.familyCount = familyCount;
	}

	public List<String> getFamilyMembers() {
		return familyMembers;
	}

	public void setFamilyMembers(List<String> familyMembers) {
		this.familyMembers = familyMembers;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public List<String> getBookings() {
		return bookingId;
	}

	public void setBookings(List<String> bookings) {
		this.bookingId = bookings;
	}

	public void addBookings(String bookingId) {
		this.bookingId.add(bookingId);
	}

	@Override
	public String toString() {
		return "Card [cardId=" + cardId + ", password=" + password + ", familyCount=" + familyCount + ", familyMembers="
				+ familyMembers + ", cardType=" + cardType + ", bookingId=" + bookingId +"currentMonthProductList: "+currentMonthProductList+ "]";
	}

	public boolean getIsFirstTimeLogin() {
		return isFirstTimeLogin;
	}

	public void setFirstTimeLogin(boolean isFirstTimeLogin) {
		this.isFirstTimeLogin = isFirstTimeLogin;
	}

	public List<Product> getCurrentMonthProductList() {
		return currentMonthProductList;
	}

	public void setCurrentMonthProductList(List<Product> currentMonthProductList) {
		this.currentMonthProductList = currentMonthProductList;
	}

}
