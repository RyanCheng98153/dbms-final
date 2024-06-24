import React from "react";
import styled from "styled-components";
import List from "../../components/list";
import { useState, useEffect } from "react";
import historyServices from "../../services/history-services";
import planServices from "../../services/plan-services";

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
  const [history, setHstory] = useState<IHistory[]>([
      {
          id:0,
          time_stamp: new Date(),
          book_id:0,
          bookpage:0,
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

  React.useEffect( () => {

    const fetchData = async () => {
      try {
        const response = await historyServices.getHistory()
        if(!response) {console.log('no data in response'); return;}
        const responseHistory:IHistory[] = response.data    
        setHstory(responseHistory)
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
            // items={testHistory}
            items={history}
            renderItem={(item, index) => <BookHistoryItem record={item} index={index} />}
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
  
const BookHistoryItem = ({ record, index }: { record: IHistory, index: number }) => {
  let recordDate = new Date(record.time_stamp)
  let recordDateString = recordDate.getFullYear() + '/' + recordDate.getMonth() + '/' + recordDate.getDay()

  const [bookName, setBookName] = useState<string>("");

  useEffect(() => {
    const fetchBookName = async () => {
      try {
        const response = await planServices.getbookname_by_id(record.book_id);
        setBookName(response.data.book_title); 
      } catch (error) {
        console.error('Error fetching book name:', error); //這邊會跳error，但不影響
      }
    };
    fetchBookName();
  }, [record.book_id]);

  return (
    <ListItem index={index}>
      <Index>{ index+1 }</Index>
      <RecordId>{record.id}</RecordId>
      <RecordTime>{recordDateString}</RecordTime>
      <BookId>{bookName}</BookId>
      <BookPage>{record.bookpage}</BookPage>
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