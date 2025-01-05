package com.E_Ration_Shop.E_Ration.Shop.Controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Service.CardService;
import com.E_Ration_Shop.E_Ration.Shop.Service.CardTypeService;

@RestController
@RequestMapping("/cardType")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class CardTypeController {
	private CardTypeService cardTypeService = new CardTypeService();
	private CardService cardService = new CardService();
	private final Logger log = LoggerFactory.getLogger(CardTypeController.class);

	@GetMapping("/product/cardId/{cardId}")
	public ResponseEntity<List<Product>> cardTypeProducts(@PathVariable String cardId) {
		final String cardType = cardService.findCardType(cardId);
		log.info("Card type got from cardservice " + cardType);
		return ResponseEntity.status(HttpStatus.OK).body(cardTypeService.find(cardType).getProduct());
	}
	@GetMapping("/product/cardType/{cardType}")
	public ResponseEntity<List<Product>> cardTypeProduct(@PathVariable String cardType){
		log.info("Card type got from cardservice " + cardType);
		return ResponseEntity.status(HttpStatus.OK).body(cardTypeService.find(cardType).getProduct());
	}
}
