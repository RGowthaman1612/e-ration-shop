package com.E_Ration_Shop.E_Ration.Shop.Model;

import java.util.List;

import com.Validator.ValidPassword;

import jakarta.validation.constraints.NotBlank;

public class User {

	@NotBlank(message = "User Name cannot be null or empty")
	private String userName;
	@ValidPassword
	private String password;
	private List<Integer> list;
	private Card card;

//	public User(@NotBlank(message = "User Name cannot be null or empty") String userName, String password,
//			List<Integer> list, Card card) {
//		super();
//		this.userName = userName;
//		this.password = password;
//		this.list = list;
//		this.card = card;
//	}

	public User(@NotBlank(message = "User Name cannot be null or empty") String userName, String password,
			List<Integer> list) {
		this.userName = userName;
		this.password = password;
		this.setList(list);
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public User() {

	}

	public List<Integer> getList() {
		return list;
	}

	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password + ", list=" + list + "]";
	}

	public void setList(List<Integer> list) {
		this.list = list;
	}

	public Card getCard() {
		return card;
	}

	public void setCard(Card card) {
		this.card = card;
	}

}
