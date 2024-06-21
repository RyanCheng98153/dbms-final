import React, { useState, useEffect } from "react";
import List from "../../components/list";
import styled from "styled-components";
import BookService from "../../services/book-services";

interface bookProp {
  id: number;
  isbn: number;
  title: string;
  author: string;
  price: number;
  category: string;
  edition: number;
  current_page: number;
}

interface IBook {
  id: number;
  ISBN: string;
  book_title: string;
  author: string;
  price: number;
  category: number;
  edition: number;
  current_page: number;
}

const Books = () => {
  const [books, setBooks] = useState<bookProp[]>([]);
  const [newBook, setNewBook] = useState<bookProp>({
    id: 0,
    isbn: 0,
    title: "",
    author: "",
    price: 0,
    category: "",
    edition: 0,
    current_page: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookService.getBooks();
        if (!response) {
          console.log("no data in response");
          return;
        }
        const responseBooks: bookProp[] = response.data.map((item: IBook) => ({
          id: item.id,
          isbn: item.ISBN,
          title: item.book_title,
          author: item.author,
          price: item.price,
          category: item.category,
          edition: item.edition,
          current_page: item.current_page,
        }));
        setBooks(responseBooks);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const addBook = async () => {
    try {
      await BookService.addBooks(
        newBook.isbn.toString(),
        newBook.title,
        parseInt(newBook.author),
        newBook.price,
        parseInt(newBook.category),
        newBook.edition,
        newBook.current_page
      );
      setBooks([...books, newBook]);
      setNewBook({
        id: 0,
        isbn: 0,
        title: "",
        author: "",
        price: 0,
        category: "",
        edition: 0,
        current_page: 0,
      });
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  };

  const deleteBook = async (bookId: number) => {
    try {
      await BookService.deleteBook(bookId.toString());
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("An error occurred while deleting the book:", error);
    }
  };

  const updatePage = async (bookId: number, currentPage: number) => {
    try {
      await BookService.updatePage(bookId, currentPage);
      setBooks(
        books.map(book =>
          book.id === bookId ? { ...book, current_page: currentPage } : book
        )
      );
    } catch (error) {
      console.error("An error occurred while updating the page:", error);
    }
  };

  const handleFileChange = async (bookId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      try {
        await BookService.uploadPDF(bookId, file);
        alert("PDF uploaded successfully");
      } catch (error) {
        console.error("Error uploading PDF:", error);
        alert("Failed to upload PDF");
      }
    }
  };

  return (
    <div>
      <ListHeader />
      <List items={books} renderItem={bookRecord} />
      <AddBookContainer>
        <h3>新增書籍</h3>
        <Input
          type="number"
          name="isbn"
          value={newBook.isbn}
          onChange={handleInputChange}
          placeholder="ISBN"
        />
        <Input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="書名"
        />
        <Input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="作者"
        />
        <Input
          type="number"
          name="price"
          value={newBook.price}
          onChange={handleInputChange}
          placeholder="價格"
        />
        <Input
          type="text"
          name="category"
          value={newBook.category}
          onChange={handleInputChange}
          placeholder="類別"
        />
        <Input
          type="number"
          name="edition"
          value={newBook.edition}
          onChange={handleInputChange}
          placeholder="版次"
        />
        <Input
          type="number"
          name="current_page"
          value={newBook.current_page}
          onChange={handleInputChange}
          placeholder="已讀頁數"
        />
        <Button onClick={addBook}>新增書籍</Button>
      </AddBookContainer>
    </div>
  );

  function bookRecord(book: bookProp, index: number) {
    return (
      <ListItem key={book.id} index={index}>
        <Index>{index + 1}</Index>
        <BookId>{book.id}</BookId>
        <BookIsbn>{book.isbn}</BookIsbn>
        <BookTitle>{book.title}</BookTitle>
        <BookAuthor>{book.author}</BookAuthor>
        <BookPrice>{book.price}</BookPrice>
        <BookCategory>{book.category}</BookCategory>
        <BookEdition>{book.edition}</BookEdition>
        <CurrentPage>{book.current_page}</CurrentPage>
        <DeleteButton onClick={() => deleteBook(book.id)}>刪除</DeleteButton>
        <UpdatePageContainer>
          <Input
            type="number"
            placeholder="更新頁數"
            onBlur={(e) =>
              updatePage(book.id, parseInt(e.target.value))
            }
          />
        </UpdatePageContainer>
        <Input
          type="file"
          onChange={(e) => handleFileChange(book.id, e)}
        />
      </ListItem>
    );
  }
};

const ListHeader = () => {
  return (
    <HeaderContainer>
      <Index>{'.'}</Index>
      <BookId>{'id'}</BookId>
      <BookIsbn>{'ISBN'}</BookIsbn>
      <BookTitle>{'書名'}</BookTitle>
      <BookAuthor>{'作者'}</BookAuthor>
      <BookPrice>{'價格'}</BookPrice>
      <BookCategory>{'類別'}</BookCategory>
      <BookEdition>{'版次'}</BookEdition>
      <CurrentPage>{'已讀頁數'}</CurrentPage>
      <Actions>{'操作'}</Actions>
    </HeaderContainer>
  )
};

const ListItem = styled.div.attrs<{ index: number }>((props) => {
  return {
    index: props.index
  };
})`
  display: flex;
  flex-direction: row;
  padding: 15px 15px;
  height: 20;
  border-bottom: 1px solid gray;
  background-color: ${(props) => props.index % 2 ? "white" : "lightgrey"};
  justify-content: space-between;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 20;
  border-bottom: 1px solid gray;
  background-color: wheat;
  align-items: center;
  justify-content: space-between;
`;

const listItemCommon = `
  margin-left: 1px;
  margin-right: 1px;
  padding-inline: 1px;
  text-align: right;
`;

const Index = styled.div`
  ${listItemCommon}
  text-align: left;
  width: 20px;
`;

const BookId = styled.div`
  ${listItemCommon}
  width: 30px;
`;

const BookIsbn = styled.div`
  ${listItemCommon}
  width: 120px;
`;

const BookTitle = styled.div`
  ${listItemCommon}
  width: 120px;
`;

const BookAuthor = styled.div`
  ${listItemCommon}
  width: 70px;
`;

const BookPrice = styled.div`
  ${listItemCommon}
  width: 50px;
`;

const BookCategory = styled.div`
  ${listItemCommon}
  width: 80px;
`;

const BookEdition = styled.div`
  ${listItemCommon}
  width: 60px;
`;

const CurrentPage = styled.div`
  ${listItemCommon}
  width: 100px;
`;

const Actions = styled.div`
  ${listItemCommon}
  width: 120px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
`;

const UpdatePageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: darkgreen;
  }
`;

const AddBookContainer = styled.div`
  margin-top: 20px;
`;

export default Books;
