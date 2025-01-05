package com.E_Ration_Shop.E_Ration.Shop.Repository;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoDBClient {
	private static MongoClient client;
	private static MongoDatabase db;
	private static final String MongoDatabaseName = "E_Ration_Shop";
	private static final String con = "mongodb+srv://<MONGODB_CONNECTION>.mongodb.net/?retryWrites=true&w=majority&appName=Learning";

	private MongoDBClient() {

	}

	private static MongoClient getMongoClientInstance() {
		if (client == null) {
			synchronized (MongoDBClient.class) {
				if (client == null) {
					client = MongoClients.create(con);
				}
			}
		}
		return client;

	}

	private static MongoDatabase getDatabaseInstance() {
		if (db == null) {
			synchronized (MongoDBClient.class) {
				if (db == null) {
					db = getMongoClientInstance().getDatabase(MongoDatabaseName);
				}
			}
		}
		return db;
	}

	public static MongoCollection<Document> getCollectionInstance(String collectionName) {
		return getDatabaseInstance().getCollection(collectionName);

	}
}
