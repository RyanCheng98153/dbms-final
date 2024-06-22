import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect } from "react";
import favoriteServices from "../../services/favorite-services";
interface bookProp {
  id:number,
  book_id:number
  title:string,
}

const testBooks:bookProp[] = [
  {
    id: 1,
    book_id:1,
    title: '麥田捕手',
  }
]

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
    <div>
        <ListHeader/>
        <List
          // items={testBooks}
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
  // margin-top: 5px;
  // margin-bottom: 5px;
  height: 20;
  border-bottom: 1px solid gray;
  border-width: 3;
  background-color: ${(props) => props.index%2 ? "white": "lightgrey"};
  justify-content: space-between;
  align-items: center;
`

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
`
const listItemCommon = `  
  margin-left: 1px;
  margin-right: 1px;
  //background-color: yellow;
  padding-inline: 1px;
  text-align: right;
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