import React from "react";
import styled from "styled-components";
import List from "../../components/list";

interface BookHistoryProp {
  id:number,
  time_stamp:Date, //不知道型別 暫時用number暫定
  book_id:number,
  book_page:number,
  note:string
}

const testHistory:BookHistoryProp[] = [
    {
        id:1,
        time_stamp: new Date( new Date( "2024-5-31" ).toISOString() ),
        book_id: 9789867412,
        book_page: 50,
        note: 'This is the book'
    },
    {
        id:2,
        time_stamp: new Date( new Date( "2024-6-2" ).toISOString() ),
        book_id: 9789578626,
        book_page: 75,
        note: 'string1'
    },
]

const BookHistory = () => {
    return (
        <div>
            <ListHeader/>
            <List
              items={testHistory}
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
  
const BookHistoryItem = (record:BookHistoryProp, index:number) => {
  let recordDate = record.time_stamp
  let recordDateString = recordDate.getFullYear() + '/' + recordDate.getMonth() + '/' + recordDate.getDay()
  return (
    <ListItem index={index}>
      <Index>{ index+1 }</Index>
      <RecordId>{record.id}</RecordId>
      <RecordTime>{recordDateString}</RecordTime>
      <BookId>{record.book_id}</BookId>
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