# DBMS Final-Book Management System
後端: https://github.com/ChenTim1011/dbms-final-backend

# 專案說明

This project is a comprehensive Book Management System designed to streamline the management of a personal book collection, including books, reading history, and reading plans. Built with Flask for the backend and SQLite for the database, the system is equipped with a range of features to enhance user experience and Book Management operations. The frontend is developed using React, providing a responsive and interactive user interface.

Key Features:

1:Book Collection Management: Add, update, and delete books from your personal collection. The system allows detailed information for each book, including title, author, publication year, and genre.

2:Reading History: Track the books you have read, along with dates and personal notes. This feature helps users maintain a log of their reading journey.

3:Reading Plans: Create and manage reading plans to organize future reading schedules. Users can set goals and timelines for reading specific books.

4:Author Information Management: Update author details, including name, biography, nationality, and birth year, ensuring that the author database is always current.

5:PDF Upload and Reading: Upload and store PDF versions of books within the system. Users can also read these PDFs directly through an integrated PDF viewer, enhancing the reading experience.

# **Database Schema**

The database contains the following tables:

### Book

- **`id`**: Integer, Primary Key
- **`ISBN`**: Integer
- **`book_title`**: Text, Not Null
- **`author_id`**: Number
- **`author`**: Text
- **`price`**: Integer, Check (price >= 0)
- **`category`**: Text
- **`edition`**: Integer, Check (edition > 0)
- **`current_page`**: Integer, Check (current_page >= 0)
- **`pdf_path`**: Text

### ReadingHistory

- **`id`**: Integer, Primary Key
- **`time_stamp`**: Text
- **`book_id`**: Integer, Foreign Key (references Book(id)), Not Null
- **`bookpage`**: Integer, Check (bookpage >= 0)
- **`note`**: Text, Not Null

### ReadingPlan

- **`id`**: Integer, Primary Key
- **`book_id`**: Integer, Foreign Key (references Book(id)), Not Null
- **`expired_date`**: Text
- **`is_complete`**: Integer, Check (is_complete IN (0, 1))

### Note

- **`id`**: Integer, Primary Key
- **`book_id`**: Integer, Foreign Key (references Book(id)), Not Null
- **`title`**: Text
- **`content`**: Text
- **`created_at`**: Text
- **`updated_at`**: Text

### FavoriteList

- **`id`**: Integer, Primary Key
- **`book_id`**: Integer, Foreign Key (references Book(id)), Not Null
- **`book_title`**: Text

### Author (New Table)

- **`author_id`**: Integer, Primary Key
- **`author_name`**: Text, Not Null
- **`introduction`**: Text
- **`nationality`**: Text
- **`Birth_year`**: Integer, Check (Birth_year > 0)

To enhance the performance of the Library Management System, several indexes have been created:

- **Book Table:**
    - `CREATE INDEX IF NOT EXISTS idx_book_isbn ON Book (ISBN)`
    - `CREATE INDEX IF NOT EXISTS idx_category ON Book (category)`
- **Author Table:**
    - `CREATE INDEX IF NOT EXISTS idx_book_author_id ON Author (author_id)`
- **Note Table:**
    - `CREATE INDEX IF NOT EXISTS idx_note_book_id ON Note (book_id)`
- **ReadingHistory Table:**
    - `CREATE INDEX IF NOT EXISTS idx_reading_history_book_id ON ReadingHistory (book_id)`
- **ReadingPlan Table:**
    - `CREATE INDEX IF NOT EXISTS idx_reading_plan_book_id ON ReadingPlan (book_id)`
- **FavoriteList Table:**
    - `CREATE INDEX IF NOT EXISTS idx_favorite_list_book_id ON FavoriteList (book_id)`


# **Backend Features**

### **Book Management**

- **Check Book**: Check if a book with the same title already exists.
- **Add Book**: Add a new book to the library. If a book with the same title exists, the user will be prompted to confirm adding a duplicate.
- **Upload PDF**: Upload a PDF file associated with a book. The file path is stored in the pdf_path column. 
- **View PDF**: View the uploaded PDF file of a book. 
- **Add Author**: Add a new author information.

### **Reading History**

- **Add Reading History**: Add a new reading history record.

### **Reading Plan**

- **Add or Update Reading Plan**: Add a new reading plan or update an existing one for a book.

### **Notes Management**

- **Add Note**: Add a new note for a book.
- **Update Note**: Update an existing note.
- **Delete Note**: Delete a note.

### **Favorites Management**

- **Add Favorite**: Add a book to the favorite list.
- **Delete Favorite**: Remove a book from the favorite list.

### **Search and View Data**

- **Search by Category**: Search books by category.
- **View Data**: View data from the specified table.
- **View Favorites**: View the list of favorite books.

### **Delete Data**

- **Delete Data**: Delete records by clicking the delete button.
