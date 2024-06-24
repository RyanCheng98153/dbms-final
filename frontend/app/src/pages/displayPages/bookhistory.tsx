import React from "react";
import styled from "styled-components";
import List from "../../components/list";
import { useState, useEffect } from "react";
import historyServices from "../../services/history-services";
import bookServices from "../../services/book-services";

interface bookHistoryProp {
  id:number,
  time_stamp:Date, 
  book_title:string,
  book_page:number,
  note:string
}

interface IHistory{
    id: number,
    time_stamp: Date,
    book_id: number,
    bookpage: number,
    note: string
}

interface IBook {
  id: number
  ISBN: number,
  book_title: string,
  author: string,
  price: number,
  category: string,
  edition: number,
  current_page: number,
}

const BookHistory = () => {
  const [history, setHstory] = useState<bookHistoryProp[]>([
      {
          id:0,
          time_stamp: new Date(),
          book_title:'title',
          book_page:0,
          note:"history test"
      }
    ])

  const [books, setBooks] = useState<IBook[]>([
    {
      id: 0,
      ISBN: 100000000,
      book_title: '測試 & test',
      author: 'robot',
      price: 0,
      category: '測試書籍',
      edition: 0,
      current_page: 0
    }
  ])

  const [press, setPress] = useState<boolean> (false)
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        // console.log('fetched')
        const response = await bookServices.getBooks()
        if (!response) { console.log('no data in response'); return; }
        const responseBooks: IBook[] = response.data.map( (item:IBook) => item )
        setBooks(responseBooks)
      } catch (error) {
        console.error('An error occurred while fetching data:', error)
      }
    }

    const fetchData = async () => {
      fetchBook()
      
      try {
        const response = await historyServices.getHistory()
        if(!response) {console.log('no data in response'); return;}
        
        const responseHistory:bookHistoryProp[] = response.data.map(
          ( item:IHistory ) => {
            const findBook = books.filter((book) => book.id == item.book_id );
            console.log('findbook')
            // console.log(findBook)
            console.log(item.book_id)
            console.log(findBook[0].book_title)
            //console.log(books)
            return {
                id: item.id,
                time_stamp: new Date(item.time_stamp),
                book_title: findBook[0].book_title,
                book_page: item.bookpage,
                note: item.note,
            }
          }
        )
        
        setHstory(responseHistory)
      } catch (error) {
        console.error('An error occurred while fetching data:', error )
      }
    }
    fetchData()
  }, [press])

  return (
      <div>
          <button
            onClick={ () => setPress(!press) }
          >
            reload
          </button>
          <ListHeader/>
          <List
            // items={testHistory}
            items={history}
            renderItem={BookHistoryItem}
          />
      </div>
  );
};

const ListHeader = () => {
  return (
    <HeaderContainer>
      <Index>{'.'}</Index>
      <RecordId>{'record_No'}</RecordId>
      <RecordTime>{'time_stamp'}</RecordTime>
      <BookId>{'book_id'}</BookId>
      <BookPage>{'bookpage'}</BookPage>
      <PageNote>{'note'}</PageNote>
    </HeaderContainer>
  )
}
  
const BookHistoryItem = (record:bookHistoryProp, index:number) => {
  let recordDate = record.time_stamp
  let recordDateString = recordDate.getFullYear() + '/' + recordDate.getMonth() + '/' + recordDate.getDay()
  return (
    <ListItem index={index}>
      <Index>{ index+1 }</Index>
      <RecordId>{record.id}</RecordId>
      <RecordTime>{recordDateString}</RecordTime>
      <BookId>{record.book_title}</BookId>
      <BookPage>{record.book_page}</BookPage>
      <PageNote>{record.note}</PageNote>
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
  background-color: lightblue;
  align-items: center;
  justify-content: space-between;
`
const listItemCommon = `  
  margin-left: 1px;
  margin-right: 1px;
  // background-color: yellow;
  padding-inline: 1px;
  text-align: right;
`

const Index = styled.text`
  ${listItemCommon}
  text-align: left;
  width: 10px; 
`
const RecordId = styled.text`
  ${listItemCommon}
  width: 80px; 
`
const RecordTime = styled.text`
  ${listItemCommon}
  width: 100px; 
`
const BookId = styled.text`
  ${listItemCommon}
  width: 110px; 
`
const BookPage = styled.text`
  ${listItemCommon}
  width: 90px; 
`
const PageNote = styled.text`
  ${listItemCommon}
  width: 250px; 
`

 
export default BookHistory;