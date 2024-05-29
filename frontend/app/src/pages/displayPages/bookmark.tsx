import React from "react";
import styled from "styled-components";
import List from "../../components/list";

interface bookmarkprop {
  id:number,
  time_stamp:number, //不知道型別 暫時用number暫定
  book_id: number,
  book_page: number,
  note:string
}

const testBookmarks:bookmarkprop[] = [
    {
        id:1,
        time_stamp:10, //不知道型別 暫時用number暫定
        book_id: 9789867412,
        book_page: 50,
        note:'string'
    },
    {
        id:2,
        time_stamp:11, //不知道型別 暫時用number暫定
        book_id: 9789867412,
        book_page: 75,
        note:'string'
    },
]

const BookMark = () => {
    return (
        
        <div>
            <h1>
                BookMark
            </h1>
            <ListHeader/>
            <List
            items={testBookmarks}
            renderItem={bookmarkRecord}
            />
        </div>
    );
};


const ListHeader = () => {
    return (
      <HeaderContainer>
        <Bookid >{'bookid'}</Bookid>
      </HeaderContainer>
    )
  }
  
  const bookmarkRecord = (record:bookmarkprop, index:number) => {
    return (
      <ListItem index={index}>
        <Index>{ index+1 }</Index>
        <Bookid >{record.book_id}</Bookid>
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
    //background-color: yellow;
    padding-inline: 1px;
    text-align: right;
  `
  
  const Index = styled.text`
    ${listItemCommon}
    text-align: left;
    width: 20px; 
  `
  const Bookid = styled.text`
    ${listItemCommon}
    width: 50px; 
  `
 
export default BookMark;