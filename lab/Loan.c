#include <stdio.h>

const char* evaluate_loan(int credit_score, int income, int loan_amount) {
    if (credit_score >= 700 && income >= 50000 && loan_amount <= 200000) {
        return "Approved";
    } else if (credit_score < 600 || income < 30000 || loan_amount > 300000) {
        return "Denied";
    } else {
        return "Manual Review";
    }
}

int main() {
    int credit_score, income, loan_amount;
    printf("Enter credit score: ");
    scanf("%d", &credit_score);
    printf("Enter annual income: ");
    scanf("%d", &income);
    printf("Enter loan amount: ");
    scanf("%d", &loan_amount);
    
    const char* result = evaluate_loan(credit_score, income, loan_amount);
    printf("Loan Status: %s\n", result);
    
    return 0;
}