#include <stdio.h>

#define MAX_ITEMS 100

// Arrays to store item names, prices, and quantities
char item_names[MAX_ITEMS][50];  // Array to store item names
float item_prices[MAX_ITEMS];     // Array to store item prices
int item_quantities[MAX_ITEMS];   // Array to store item quantities
int item_count = 0;               // Counter for the number of items in the cart

// Function to add an item to the cart
void add_item(char name[], float price, int quantity) {
    // Check if cart is full or if price/quantity is invalid
    if (item_count >= MAX_ITEMS || price < 0 || quantity <= 0) {
        printf("Invalid item or cart is full!\n");
        return;
    }

    // Add the item details to the arrays
    snprintf(item_names[item_count], sizeof(item_names[item_count]), "%s", name);
    item_prices[item_count] = price;
    item_quantities[item_count] = quantity;
    item_count++;
}

// Function to calculate the total cost of the items in the cart
float calculate_total() {
    float total = 0;
    for (int i = 0; i < item_count; i++) {
        total += item_prices[i] * item_quantities[i];
    }
    return total;
}

// Function to apply a discount to the total cost
float apply_discount(float total, float discount_percent) {
    if (discount_percent < 0 || discount_percent > 100) {
        printf("Invalid discount percentage!\n");
        return total;
    }
    return total - (total * discount_percent / 100);
}

// Main function for testing the shopping cart system
int main() {
    // Example: Add items to the cart
    add_item("Apple", 1.50, 3);  // 3 Apples at $1.50 each
    add_item("Banana", 0.99, 5); // 5 Bananas at $0.99 each

    // Calculate the total price before discount
    float total = calculate_total();
    printf("Total before discount: $%.2f\n", total);

    // Apply 10% discount
    float discounted_total = apply_discount(total, 10);
    printf("Total after 10%% discount: $%.2f\n", discounted_total);

    return 0;
}