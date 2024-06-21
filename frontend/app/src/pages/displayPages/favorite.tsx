import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect } from "react";
import favoriteServices from "../../services/favorite-services";

interface bookProp {
  id: number;
  book_id: number;
  book_title: string;
}

const Favorites = () => {
  const [books, setBooks] = useState<bookProp[]>([]);

  const handleDelete = async (bookId: number) => {
    const isConfirmed = window.confirm("確定要將這本書從我的最愛移除嗎？");
    if (!isConfirmed) return;
    try {
      await favoriteServices.deletefavorite(bookId);
      setBooks((prevBooks) => prevBooks.filter(book => book.book_id !== bookId));
    } catch (error) {
      console.error('An error occurred while deleting the book:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await favoriteServices.getfavorite();
        if (!response) {
          console.log('no data in response');
          return;
        }
        setBooks(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const ListHeader = () => {
    return (
      <HeaderContainer>
        <Index>{'.'}</Index>
        <BookId>{'id'}</BookId>
        <BookTitle>{'book title'}</BookTitle>
        <Operation>操作</Operation>
      </HeaderContainer>
    )
  }

  const bookRecord = (book: bookProp, index: number) => {
    return (
      <ListItem index={index}>
        <Index>{index + 1}</Index>
        <BookId>{book.book_id}</BookId>
        <BookTitle>{book.book_title}</BookTitle>
        <Operation>
          <DeleteButton onClick={() => handleDelete(book.book_id)}>刪除</DeleteButton>
        </Operation>
      </ListItem>
    );
  }

  return (
    <div>
      <ListHeader />
      <List
        items={books}
        renderItem={bookRecord}
      />
    </div>
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

const BookTitle = styled.div`
  ${listItemCommon}
  width: 120px;
`;

const Operation = styled.div`
  ${listItemCommon}
  width: 70px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

export default Favorites;
