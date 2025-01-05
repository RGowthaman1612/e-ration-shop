package com.E_Ration_Shop.E_Ration.Shop.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.E_Ration_Shop.E_Ration.Shop.Model.Card;
import com.E_Ration_Shop.E_Ration.Shop.Model.User;
import com.E_Ration_Shop.E_Ration.Shop.Service.CardService;
import com.E_Ration_Shop.E_Ration.Shop.Service.CardTypeService;
import com.Validator.ClassValid;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/cards")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class CardController {
	@Autowired
	private CardService cardService;
	@Autowired
	private CardTypeService cardTypeService;
	private final Logger log = LoggerFactory.getLogger(CardController.class);
	
	@PostMapping("/changePassword")
	public ResponseEntity<Object> changePassword(@RequestBody Card card) {
		final Card dbCard = cardService.findCard(card.getCardId());
		if (dbCard != null) {
			if (cardService.changePassword(card)) { 
				log.info("User Password changed in Card ID: " + card.getCardId());
				return  ResponseEntity.status(HttpStatus.OK).body(card);
			} else {
				log.info("Failed to change passoword : " + card.getCardId());
				return new ResponseEntity<>("Failed to change password", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			log.info("Card ID doesn't exists " + card.getCardId());
			return new ResponseEntity<>("Card ID doesn't exists", HttpStatus.BAD_REQUEST);
		}
	}
	@PostMapping("/addCard")
	public ResponseEntity<Object> addCard(@RequestBody Card card){
		final Card dbCard = cardService.findCard(card.getCardId());
		if (dbCard == null) {
			card.setCurrentMonthProductList(cardTypeService.find(card.getCardType()).getProduct());
			if (cardService.addCard(card)) { 
				log.info("Card added with Card ID: " + card.getCardId());
				return  ResponseEntity.status(HttpStatus.OK).body(card);
			} else {
				log.info("Failed to add card: " + card.getCardId());
				return new ResponseEntity<>("Failed to card", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			log.info("User can't Logged in ");
			return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody Card card) {
		if(cardService.IsFirstTimeLogin(card)) {
			log.info("User Logged in for First Time	 "+card.getCardId());
			return  ResponseEntity.status(HttpStatus.RESET_CONTENT).body("First Time Login");
		}
		if (cardService.verifyCard(card)) {
			log.info("User Logged in "+card.getCardId());
			return  ResponseEntity.status(HttpStatus.OK).body(card.getCardId());
		} else {
			log.info("User can't Logged in ");
			return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/userSignIn")
	public ResponseEntity<Object> UserSignIn(@RequestBody @ClassValid @Valid User user) {
		return new ResponseEntity<>("User signed in successful", HttpStatus.OK);
	}

	@PostMapping("/classValiding")
	public ResponseEntity<Object> ClassValiding(@RequestBody @ClassValid JsonNode user) {
		return new ResponseEntity<>("User signed in successful", HttpStatus.OK);
	}

	@GetMapping("/getBookingId/{cardId}")
	public ResponseEntity<Object>  getBookingId(@PathVariable String cardId) {
		log.info("Getting booking id CARD ID "+cardId);
		if(cardService.findCard(cardId)==null) {
			log.info("Card not found"+cardId);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Card not found");
		}
		log.info(cardService.getBookingId(cardId).toString());
		return ResponseEntity.status(HttpStatus.OK).body(cardService.getBookingId(cardId));
	}

	@GetMapping("/getCurrentMonthProductMap/{cardId}")
	public ResponseEntity<Object> getCurrentMonthProductMap(@PathVariable String cardId){
		log.info("Getting Current Month Product Map id CARD ID"+cardId);
		return ResponseEntity.status(HttpStatus.OK).body(cardService.getCurrentMonthProductList(cardId));
	}
}
