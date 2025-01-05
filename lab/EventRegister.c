#include <stdio.h>

void register_for_event(int age) {
    if (age < 18) {
        printf("Sorry, you are too young to register.\n");
    } else if (age > 60) {
        printf("Sorry, you are above the age limit for registration.\n");
    } else {
        printf("Registration successful! Welcome to the event.\n");
    }
}

int main() {
    int age;
    printf("Enter your age to register for the event: ");
    scanf("%d", &age);
    register_for_event(age);
    return 0;
}