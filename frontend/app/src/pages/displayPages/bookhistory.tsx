import React from "react";
import styled from "styled-components";
import List from "../../components/list";
import { useState, useEffect } from "react";
import historyServices from "../../services/history-services";
import planServices from "../../services/plan-services";

interface IHistory {
  id: number,
  time_stamp: Date,
  book_id: number,
  bookpage: number,
  note: string
}

const BookHistory = () => {
  const [history, setHistory] = useState<IHistory[]>([
    {
      id: 0,
      time_stamp: new Date(),
      book_id: 0,
      bookpage: 0,
      note: "history test"
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await historyServices.getHistory();
        if (!response) { console.log('no data in response'); return; }
        const responseHistory: IHistory[] = response.data;
        setHistory(responseHistory);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <ListHeader />
      <List
        items={history}
        renderItem={(item, index) => <BookHistoryItem record={item} index={index} />}
      />
    </Container>
  );
};

const ListHeader = () => {
  return (
    <HeaderContainer>
      <RecordId>{'No.'}</RecordId>
      <RecordTime>{'閱讀日期'}</RecordTime>
      <BookId>{'書籍名稱'}</BookId>
      <BookPage>{'已讀頁數'}</BookPage>
      <PageNote>{'筆記內容'}</PageNote>
    </HeaderContainer>
  );
};

const BookHistoryItem = ({ record, index }: { record: IHistory, index: number }) => {
  let recordDate = new Date(record.time_stamp);
  let recordDateString = `${recordDate.getFullYear()}/${recordDate.getMonth() + 1}/${recordDate.getDate()}`;

  const [bookName, setBookName] = useState<string>("");

  useEffect(() => {
    const fetchBookName = async () => {
      try {
        const response = await planServices.getbookname_by_id(record.book_id);
        setBookName(response.data.book_title);
      } catch (error) {
        console.error('Error fetching book name:', error);
      }
    };
    fetchBookName();
  }, [record.book_id]);

  return (
    <ListItem index={index}>
      <RecordId>{record.id}</RecordId>
      <RecordTime>{recordDateString}</RecordTime>
      <BookId>{bookName}</BookId>
      <BookPage>
        <Text>已讀 </Text>
        <Text style={{ width: 30, maxWidth: 30, display: 'inline-block' }}>{record.bookpage}</Text>
        <Text> 頁</Text>
      </BookPage>
      <PageNote>{record.note}</PageNote>
    </ListItem>
  );
};

const Container = styled.div`
  background-image: url('/path/to/your/illustration-background.jpg');
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.div.attrs<{ index: number }>((props) => {
  return {
    index: props.index
  };
})`
  display: flex;
  flex-direction: row;
  padding: 15px;
  border-bottom: 1px solid gray;
  background-color: ${(props) => props.index % 2 ? "#f0f8ff" : "#e6e6fa"};
  justify-content: space-between;
  align-items: center;
  font-family: 'Handwritten', sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
  background-color: #ffebcd;
  align-items: center;
  justify-content: space-between;
  font-family: 'Handwritten', sans-serif;
`;

const listItemCommon = `
  margin-left: 1px;
  margin-right: 1px;
  padding-inline: 1px;
  text-align: right;
`;

const RecordId = styled.div`
  ${listItemCommon}
  text-align: left;
  width: 20px;
`;

const RecordTime = styled.div`
  ${listItemCommon}
  width: 80px;
`;

const BookId = styled.div`
  ${listItemCommon}
  width: 130px;
`;

const BookPage = styled.div`
  ${listItemCommon}
  width: 100px;
`;

const PageNote = styled.div`
  ${listItemCommon}
  width: 100px;
`;

const Text = styled.span`
  font-family: 'Handwritten', sans-serif;
`;

export default BookHistory;
