import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect } from "react";
import favoriteServices from "../../services/favorite-services";
interface bookProp {
  id:number,
  book_id:number
  title:string,
}

interface IBook{
  id: number
  book_id:number
  book_title: string,
}

const Books = () => {
  // const [press, setPress] = useState<boolean>(false)

  const handleDelete = async (bookId: number) => {
    const isConfirmed = window.confirm("確定要將這本書從我的最愛移除嗎？");
    if (!isConfirmed) return;
  
    try {
      const response =await favoriteServices.deletefavorite(bookId);
      // 檢查 HTTP 狀態碼是否為 200 表示成功
      if (response.status === 200) {
        // 從狀態中移除書籍
        setBooks((prevBooks) => prevBooks.filter(book => book.book_id !== bookId));
        alert('書籍已從我的最愛中移除！');
      } else {
        console.error('Failed to delete the book, server responded with:', response.status);
        alert('刪除書籍失敗，請稍後再試。');
      }
    } catch (error) {
      console.error('An error occurred while deleting the book:', error);
      alert('刪除書籍過程中出現錯誤，請稍後再試。');
    }
  };
  
  const [books, setBooks] = useState<bookProp[]>([
    {
      id: 0,
      book_id: 100000000,
      title: '測試 & test',
    }
  ])
  useEffect( () => {
    const fetchData = async () => {
      try {
        // console.log('fetched')
        const response = await favoriteServices.getfavorite()
        if(!response) {console.log('no data in response'); return;}
        const responseBooks:bookProp[] = response.data.map(
          ( item:IBook ) => {
            return {
              id: item.id,
              book_id:item.book_id,
              title: item.book_title,
            }
          }
        )
        
        setBooks(responseBooks)
      } catch (error) {
        console.error('An error occurred while fetching data:', error )
      }
    }
    fetchData()
  }, [])
  const ListHeader = () => {
    return (
      <HeaderContainer>
        {<BookId >{'book_id'}</BookId>}
        <BookTitle>{'book title'}</BookTitle>
        <Operation>操作</Operation>
      </HeaderContainer>
    )
  }
  
  const bookRecord = (book:bookProp, index:number) => {
    return (
      <ListItem index={index}>
        {<BookId >{book.book_id}</BookId>}
        <BookTitle>{book.title}</BookTitle>
        <Operation>
        <DeleteButton onClick={() => handleDelete(book.book_id)}>刪除</DeleteButton>
        </Operation>
      </ListItem>
    );
  }


  return (
    <Container>
      <ListHeader/>
      <List
        items={books}
        renderItem={bookRecord}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 720px;
  background-color: #f4e9d8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;
`;
// Books list styling
const ListItem = styled.div.attrs<{ index: number }>((props) => {
  return {
    index: props.index
  };
})`
  display: flex; 
  flex-direction: row;
  padding: 15px 15px; 
  border-bottom: 1px solid #D3B8AE;  // 使用復古色調的邊框
  background-color: ${(props) => props.index % 2 ? "#f5f5dc" : "#fffaf0"};  // 使用復古色調的背景色
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FFEFD5;  // 使用復古色調的懸停效果
  }
`

const HeaderContainer = styled.div`
  display: flex; 
  flex-direction: row;
  padding: 10px 15px; 
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 2px solid #D3B8AE;
  background-color: #DEB887;  // 使用復古色調的背景色
  align-items: center;
  justify-content: space-between;
`

const listItemCommon = `  
  margin-left: 1px;
  margin-right: 1px;
  text-align: right;
  color: #8B4513;  // 使用復古色調的文本顏色
`

const Index = styled.text`
  ${listItemCommon}
  text-align: left;
  width: 20px; 
`
const BookId = styled.text`
  ${listItemCommon}
  width: 30px; 
`
const BookIsbn = styled.text`
  ${listItemCommon}
  width: 120px; 
`
const BookTitle = styled.text`
  ${listItemCommon}
  width: 120px; 
`
const Operation = styled.text`
  ${listItemCommon}
  width: 70px; 
`
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

export default Books;