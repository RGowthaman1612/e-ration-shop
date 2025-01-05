#include <stdio.h>

double calculate_tax(double income) {
    double tax = 0.0;

    if (income <= 10000) {
        tax = income * 0.10;
    } else if (income <= 20000) {
        tax = 10000 * 0.10 + (income - 10000) * 0.15;
    } else if (income <= 50000) {
        tax = 10000 * 0.10 + 10000 * 0.15 + (income - 20000) * 0.20;
    } else {
        tax = 10000 * 0.10 + 10000 * 0.15 + 30000 * 0.20 + (income - 50000) * 0.25;
    }
    
    return tax;
}

int main() {
    double income = 45000;
    double tax = calculate_tax(income);
    printf("Income: $%.2f, Tax: $%.2f\n", income, tax);
    return 0;
}