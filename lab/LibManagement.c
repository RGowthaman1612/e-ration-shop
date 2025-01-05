#include <stdio.h>
#include <string.h>

int binary_search(char books[][50], int size, const char *title) {
    int left = 0, right = size - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        int result = strcmp(books[mid], title);

        if (result == 0) {
            return mid;
        }

        if (result < 0) {
            left = mid + 1;
        } 

        else {
            right = mid - 1;
        }
    }
    return -1; 
}

int main() {
    
    char books[][50] = {
        "C Programming",
        "Data Structures",
        "Introduction to Algorithms",
        "The Pragmatic Programmer",
        "Clean Code"
    };

    int book_ids[] = {1, 2, 3, 4, 5};
    
    int size = 5;
    char search_title[50];

    printf("Enter the book title to search: ");
    fgets(search_title, sizeof(search_title), stdin);
    search_title[strcspn(search_title, "\n")] = 0; 

    int result = binary_search(books, size, search_title);


    if (result != -1) {
        printf("Book found!\n");
        printf("Book ID: %d\n", book_ids[result]);
        printf("Title: %s\n", books[result]);
    } else {
        printf("Book not found!\n");
    }

    return 0;
}