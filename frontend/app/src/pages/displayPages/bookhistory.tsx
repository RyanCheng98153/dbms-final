import React from "react";
import styled from "styled-components";
import List from "../../components/list";
import { useState, useEffect } from "react";
import historyServices from "../../services/history-services";

interface bookHistoryProp {
  id:number,
  time_stamp:Date, 
  book_id:number,
  book_page:number,
  note:string
}
/*
const testHistory:bookHistoryProp[] = [
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
*/
interface IHistory{
    id: number,
    time_stamp: Date,
    book_id: number,
    bookpage: number,
    note: string
}

const BookHistory = () => {
  const [history, setHistory] = useState<bookHistoryProp[]>([]);
  const [newHistory, setNewHistory] = useState<bookHistoryProp>({
    id: 0,
    time_stamp: new Date(),
    book_id: 0,
    book_page: 0,
    note: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await historyServices.getHistory();
        if (!response) {
          console.log("no data in response");
          return;
        }

        const responseHistory: bookHistoryProp[] = response.data.map(
          (item: IHistory) => {
            return {
              id: item.id,
              time_stamp: new Date(item.time_stamp),
              book_id: item.book_id,
              book_page: item.bookpage,
              note: item.note,
            };
          }
        );

        setHistory(responseHistory);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHistory({ ...newHistory, [name]: value });
  };

  const addHistory = async () => {
    try {
      await historyServices.addHistory(
        newHistory.book_id,
        newHistory.book_page,
        newHistory.note
      );
      setHistory([...history, newHistory]);
      setNewHistory({
        id: 0,
        time_stamp: new Date(),
        book_id: 0,
        book_page: 0,
        note: "",
      });
    } catch (error) {
      console.error("An error occurred while adding the history:", error);
    }
  };

  const deleteHistory = async (historyId: number) => {
    try {
      await historyServices.deleteHistory(historyId.toString());
      setHistory(history.filter(item => item.id !== historyId));
    } catch (error) {
      console.error("An error occurred while deleting the history:", error);
    }
  };

  return (
    <div>
      <ListHeader />
      <List items={history} renderItem={BookHistoryItem} />
      <AddHistoryContainer>
        <h3>新增閱讀歷史</h3>
        <Input
          type="number"
          name="book_id"
          value={newHistory.book_id}
          onChange={handleInputChange}
          placeholder="書籍ID"
        />
        <Input
          type="number"
          name="book_page"
          value={newHistory.book_page}
          onChange={handleInputChange}
          placeholder="書籍頁數"
        />
        <Input
          type="text"
          name="note"
          value={newHistory.note}
          onChange={handleInputChange}
          placeholder="筆記"
        />
        <Button onClick={addHistory}>新增歷史</Button>
      </AddHistoryContainer>
    </div>
  );

  function BookHistoryItem(record: bookHistoryProp, index: number) {
    let recordDate = record.time_stamp;
    let recordDateString =
      recordDate.getFullYear() +
      "/" +
      (recordDate.getMonth() + 1) +
      "/" +
      recordDate.getDate();
    return (
      <ListItem key={record.id} index={index}>
        <Index>{index + 1}</Index>
        <RecordId>{record.id}</RecordId>
        <RecordTime>{recordDateString}</RecordTime>
        <BookId>{record.book_id}</BookId>
        <BookPage>{record.book_page}</BookPage>
        <PageNote>{record.note}</PageNote>
        <DeleteButton onClick={() => deleteHistory(record.id)}>刪除</DeleteButton>
      </ListItem>
    );
  }
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
      <Actions>{'操作'}</Actions>
    </HeaderContainer>
  )
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
  background-color: lightblue;
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
  width: 10px;
`;

const RecordId = styled.div`
  ${listItemCommon}
  width: 80px;
`;

const RecordTime = styled.div`
  ${listItemCommon}
  width: 100px;
`;

const BookId = styled.div`
  ${listItemCommon}
  width: 110px;
`;

const BookPage = styled.div`
  ${listItemCommon}
  width: 90px;
`;

const PageNote = styled.div`
  ${listItemCommon}
  width: 250px;
`;

const Actions = styled.div`
  ${listItemCommon}
  width: 120px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
`;

const AddHistoryContainer = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: darkgreen;
  }
`;

export default BookHistory;