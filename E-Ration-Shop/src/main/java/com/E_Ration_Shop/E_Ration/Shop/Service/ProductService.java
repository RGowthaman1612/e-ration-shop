package com.E_Ration_Shop.E_Ration.Shop.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.E_Ration_Shop.E_Ration.Shop.Model.Product;
import com.E_Ration_Shop.E_Ration.Shop.Repository.ProductRepo;

@Service
public class ProductService {
	@Autowired
	final private ProductRepo productRepo = new ProductRepo();
	final private CardTypeService cardTypeService= new CardTypeService();
	

	public Map<String, Product> getProductMap() {
		@SuppressWarnings("unchecked")
		final List<Document> productDocuments = (List<Document>) productRepo.getProductList().get("productList");
		final Map<String, Product> productMap = new HashMap<>();

		for (Document doc : productDocuments) {
			productMap.put(doc.getString("productName"),
					new Product(doc.getString("productName"), doc.getInteger("quantity"), doc.getInteger("price")));
		}
		return productMap;
	}

	public List<Product> getProductList() {
		final List<Product> productList = new ArrayList<>();
		final Map<String, Product> productMap = getProductMap();
		for (Entry<String, Product> map : productMap.entrySet()) {
			productList.add(map.getValue());
		}
		return productList;
	}

	public boolean addProductMap(List<Product> productList) {
		final Map<String, Product> productMap = getProductMap();
		for (Product product : productList) {
			Product productDB = productMap.get(product.getProductName());
			if (product.getQuantity() > 0) {
				productDB.setQuantity(Math.abs(productDB.getQuantity() + product.getQuantity()));
			}
			if (product.getPrice() > 0) {
				productDB.setPrice(product.getPrice());
				cardTypeService.updateProductPrice(productDB);
			}
			productMap.put(productDB.getProductName(), productDB);
		}
		final List<Product> updatedProductList = new ArrayList<>();
		for (Entry<String, Product> product : productMap.entrySet()) {
			updatedProductList.add(product.getValue());
		}
		return productRepo.updateProductMap(updatedProductList);
	}
	public boolean reduceProductMap(List<Product> productList) {
		final Map<String, Product> productMap = getProductMap();
		for (Product product : productList) {
			Product productDB = productMap.get(product.getProductName());
			if (product.getQuantity() > 0) {
				productDB.setQuantity(Math.abs(productDB.getQuantity() - product.getQuantity()));
			}
			if (product.getPrice() > 0) {
				productDB.setPrice(product.getPrice());
				cardTypeService.updateProductPrice(productDB);
			}
			productMap.put(productDB.getProductName(), productDB);
		}
		final List<Product> updatedProductList = new ArrayList<>();
		for (Entry<String, Product> product : productMap.entrySet()) {
			updatedProductList.add(product.getValue());
		}
		return productRepo.updateProductMap(updatedProductList);
	}

	public boolean addProduct(Product product) {
		final List<Product> productList=getProductList();
		productList.add(product);
		return productRepo.updateProductMap(productList);
	}

}
