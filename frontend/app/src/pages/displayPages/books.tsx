import React from "react";
import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect } from "react";
import bookServices from "../../services/book-services";

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

const testBooks:bookProp[] = [
  {
    id: 1,
    isbn: 9789867412,
    title: '麥田捕手',
    author: 'J.D. Salinger',
    price: 450,
    category: '文學',
    edition: 1,
    current_page: 100
  },
  {
    id: 2,
    isbn: 9789578626,
    title: 'R語言生物資訊',
    author: 'Rstudio Group',
    price: 320,
    category: '科學',
    edition: 2,
    current_page: 150
  },
  {
    id: 3,
    isbn: 9789573286,
    title: '摩訶婆羅多',
    author: 'Unknown',
    price: 520,
    category: '歷史',
    edition: 3,
    current_page: 150
  },
  {
    id: 4,
    isbn: 9789578691,
    title: '純粹理性批判',
    author: 'Kant',
    price: 300,
    category: '哲學',
    edition: 1,
    current_page: 250
  },
  {
    id: 5,
    isbn: 9789866785,
    title: '資本論',
    author: 'K. Marx	',
    price: 420,
    category: '社會學',
    edition: 2,
    current_page: 300
  },
  {
    id: 6,
    isbn: 9789573486,
    title: '傲慢與偏見',
    author: 'Jane Austen',
    price: 320,
    category: '西洋文學',
    edition: 3,
    current_page: 320
  },
  
]

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

const Books = () => {
  const [press, setPress] = useState<boolean>(false)
  const [books, setBooks] = useState<bookProp[]>([
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
  ])
  
  React.useEffect( () => {
    const fetchData = async () => {
      try {
        // console.log('fetched')
        const response = await bookServices.getBooks()
        if(!response) {console.log('no data in response'); return;}
        // console.log('response book')
        // console.log(response.data[0])

        const responseBooks:bookProp[] = response.data.map(
          ( book:IBook ) => {
            return {
              id: book.id,
              isbn: book.ISBN,
              title: book.book_title,
              author: book.author,
              price: book.price,
              category: book.category,
              edition: book.edition,
              current_page: book.current_page
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

const ListHeader = () => {
  return (
    <HeaderContainer>
      <Index>{ '.' }</Index>
      {/*<BookId >{'id'}</BookId>*/}
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
      <Index>{ index+1 }</Index>
      {/*<BookId >{book.id}</BookId>*/}
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
  width: 110px; 
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
export default Books;