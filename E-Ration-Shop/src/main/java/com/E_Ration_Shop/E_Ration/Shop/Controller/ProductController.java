package com.E_Ration_Shop.E_Ration.Shop.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Service.ProductService;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping("/productMap")
	public ResponseEntity<Object> getProductList() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getProductList());
	}
	@PostMapping("/productUpdateAdd")
	public  ResponseEntity<Object> addProductList(@RequestBody List<Product> productList){
		if(productService.addProductMap(productList)) {
			return ResponseEntity.status(HttpStatus.OK).body("Products Updated");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Products cannot Updated");
	}
	@PostMapping("/productUpdateReduce")
	public  ResponseEntity<Object> reduceProductList(@RequestBody List<Product> productList){
		if(productService.reduceProductMap(productList)) {
			return ResponseEntity.status(HttpStatus.OK).body("Products Updated");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Products cannot Updated");
	}
	@PostMapping("/addProduct")
	public  ResponseEntity<Object> addProduct(@RequestBody Product product){
		if(productService.addProduct(product)) {
			return ResponseEntity.status(HttpStatus.OK).body("Products Updated");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Products cannot Updated");
	}
	
}
