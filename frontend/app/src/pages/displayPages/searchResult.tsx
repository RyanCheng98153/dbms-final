import React from "react";
import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect } from "react";
import bookServices from "../../services/book-services";
import { useContext } from "react";
import { CategoryContext } from "../../components/shareContext";

interface bookProp {
    id:number,
    isbn:number,
    title:string,
    author:string,
    price:number,
    category:string,
    edition:number,
    current_page:number
  }
  
  interface IBook{
    id: number
    ISBN: string,
    book_title: string,
    author: number,
    price: number,
    category: number,
    edition: number,
    current_page: number,
  }

const testBooks:bookProp[] = [
  {
    id: 0,
    isbn: 100000000,
    title: '測試 & test',
    author: 'robot',
    price: 0,
    category: '測試書籍',
    edition: 0,
    current_page: 0
  }
]

const SearchResult = () => {
  // const [press, setPress] = useState<boolean>(false)
  
  // shared category: A magical way to share usestate component between two pages
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('CategoryContext must be used within a CategoryProvider');
  } const { category } = context;
  
  // books source initialize
  const [masterSource, setMasterSource] = useState<bookProp[]>(testBooks)
  const [filteredSource, setFilteredSource] = useState<bookProp[]>(masterSource)

  React.useEffect( () => {
    const fetchData = async () => {
      try {
        // console.log('fetched')
        const response = await bookServices.getBooks()
        if(!response) {console.log('no data in response'); return;}

        const responseBooks:bookProp[] = response.data.map(
          ( item:IBook ) => {
            return {
              id: item.id,
              isbn: item.ISBN,
              title: item.book_title,
              author: item.author,
              price: item.price,
              category: item.category,
              edition: item.edition,
              current_page: item.current_page
            }
          }
        )
        
        setMasterSource(responseBooks)
      } catch (error) {
        console.error('An error occurred while fetching data:', error )
      }
    }
    fetchData()
  }, [])

  const filterBooks = (value: string | null) => {
    if(value === null || value === ""  ){
        setFilteredSource(masterSource);
    }
    else {
      const filtered = masterSource.filter((book) =>
        //book.title.toLowerCase().includes(value.toLowerCase())
        book.category === category
      );  
      setFilteredSource(filtered);
    }
  };

  useEffect( ()=>{
    filterBooks(category)
  }, [category] )

  return (
    <Container>
      <ListHeader/>
      <List
        // items={testBooks}
        items={filteredSource}
        renderItem={bookRecord}
      />
    </Container>
  );
};

const ListHeader = () => {
    return (
      <HeaderContainer>
        {/*<Index>{ '.' }</Index>*/}
        {<BookId >{'id'}</BookId>}
        <BookIsbn>{'ISBN'}</BookIsbn>
        <BookTitle>{'book title'}</BookTitle>
        <BookAuthor>{'author'}</BookAuthor>
        <BookPrice>{'price'}</BookPrice>
        <BookCategory>{'category'}</BookCategory>
        <BookEdition>{'edition'}</BookEdition>
        <CurrentPage>{'current page'}</CurrentPage>
      </HeaderContainer>
    )
  }
  
  const bookRecord = (book:bookProp, index:number) => {
    return (
      <ListItem index={index}>
        {/*<Index>{ index+1 }</Index>*/}
        {<BookId >{book.id}</BookId>}
        <BookIsbn>{book.isbn}</BookIsbn>
        <BookTitle>{book.title}</BookTitle>
        <BookAuthor>{book.author}</BookAuthor>
        <BookPrice>{book.price}</BookPrice>
        <BookCategory>{book.category}</BookCategory>
        <BookEdition>{book.edition}</BookEdition>
        {/*<BookEdition>{'第'+book.edition+'版'}</BookEdition>*/}
        <CurrentPage>{book.current_page}</CurrentPage>
      </ListItem>
    );
  }
  
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
const BookAuthor = styled.text`
  ${listItemCommon}
  width: 70px; 
`
const BookPrice = styled.text`
  ${listItemCommon}
  width: 50px;
`
const BookCategory = styled.text`
  ${listItemCommon}
  width: 80px;
`
const BookEdition = styled.text`
  ${listItemCommon}
  width: 60px;
`
const CurrentPage = styled.text`
  ${listItemCommon}
  width: 100px;
`

 
export default SearchResult;