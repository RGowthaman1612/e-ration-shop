#include <stdio.h>

int isValidTriangle(int a, int b, int c) {
    return (a + b > c && a + c > b && b + c > a);
}

int main() {
    int a = 5, b = 5, c = 9;
    printf("Triangle Validity: %s\n", isValidTriangle(a, b, c) ? "Valid" : "Invalid");
    return 0;
}