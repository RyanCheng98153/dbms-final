import React, { useState } from "react";
import bookServices from "../../services/book-services";
import List from "../../components/list";
import styled from "styled-components";

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

const SearchCategory = () => {
  const [category, setCategory] = useState<string>("");
  const [books, setBooks] = useState<bookProp[]>([]);

  const handleSearch = async () => {
    try {
      const response = await bookServices.searchByCategory(category);
      const responseBooks: bookProp[] = response.data.map((item: any) => ({
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
      console.error("An error occurred while searching for books:", error);
    }
  };

  return (
    <div>
      <h2>搜索書籍分類</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="輸入分類"
      />
      <button onClick={handleSearch}>搜索</button>
      <ListHeader />
      <List items={books} renderItem={bookRecord} />
    </div>
  );
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
    </HeaderContainer>
  );
};

const bookRecord = (book: bookProp, index: number) => {
  return (
    <ListItem index={index}>
      <Index>{index + 1}</Index>
      <BookId>{book.id}</BookId>
      <BookIsbn>{book.isbn}</BookIsbn>
      <BookTitle>{book.title}</BookTitle>
      <BookAuthor>{book.author}</BookAuthor>
      <BookPrice>{book.price}</BookPrice>
      <BookCategory>{book.category}</BookCategory>
      <BookEdition>{book.edition}</BookEdition>
      <CurrentPage>{book.current_page}</CurrentPage>
    </ListItem>
  );
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

export default SearchCategory;
