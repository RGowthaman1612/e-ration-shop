#include <stdio.h>
#include <stdbool.h>

bool transfer_funds(double *source_balance, double *target_balance, double amount) {
    if (*source_balance >= amount) {
        *source_balance -= amount;
        *target_balance += amount;
        printf("Transfer successful!\n");
        return true;
    } else {
        printf("Insufficient funds in source account.\n");
        return false;
    }
}

int main() {
    double source_balance = 1000.0;
    double target_balance = 500.0;
    double amount = 200.0;

    printf("Source balance: $%.2f\n", source_balance);
    printf("Target balance: $%.2f\n", target_balance);

    transfer_funds(&source_balance, &target_balance, amount);

    printf("Source balance after transfer: $%.2f\n", source_balance);
    printf("Target balance after transfer: $%.2f\n", target_balance);

    return 0;
}