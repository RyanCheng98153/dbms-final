import styled from "styled-components"
import List from "../../components/list"
import { isDocument } from "@testing-library/user-event/dist/utils";
import PlanService from  "../../services/plan-services"
import planServices from "../../services/plan-services";
import React,{ useState, useEffect} from "react";
import bookServices from "../../services/book-services";

interface planProp {
    id:number,
    book_id:number,
    expired_date:Date,
    is_complete:boolean
  }


  interface IplanProp {
    id:number,
    book_id:number,
    expired_date:Date,
    is_complete:boolean
  }

  const ReadingPlan = () => {
    const [testPlan, setTestPlan] = useState<planProp[]>([
        {
            id: 1,
            book_id: 1,
            expired_date: new Date(new Date("2024-7-31").toISOString()),
            is_complete: false
        },
        {
            id: 2,
            book_id: 4,
            expired_date: new Date(new Date("2024-8-31").toISOString()),
            is_complete: true
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await planServices.getPlan();
            if (!response) {
                console.log('no data in response');
                return;
            }
            const responseBooks: planProp[] = response.data.map((item: IplanProp) => {
                return {
                    id: item.id,
                    book_id: item.book_id,
                    expired_date: item.expired_date,
                    is_complete: item.is_complete,
                };
            });
            setTestPlan(responseBooks);
        };
        fetchData();
    }, []);

    return (
        <div>
            <ListHeader />
            <List
                items={testPlan}
                renderItem={(item, index) => <PlanRecord record={item} index={index} />}
            />
        </div>
    );
};


const ListHeader = () => {
    return (
      <HeaderContainer>
        <PlanId>{'record_No'}</PlanId>
        <BookId>{'book_name'}</BookId>
        <ExpiredDate>{'Expried_date'}</ExpiredDate>
        <IsComplete>{'is_complete'}</IsComplete>
      </HeaderContainer>
    )
  }

   
  const PlanRecord = ({ record, index }: { record: planProp, index: number }) => {
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
  
    let recordDate = record.expired_date;
    let isCompleteString: string = record.is_complete ? 'True' : 'False';
  
    return (
      <ListItem index={index}>
        <PlanId>{record.id}</PlanId>
        <BookId>{bookName}</BookId>
        <ExpiredDate>{recordDate.toString()}</ExpiredDate>
        <IsComplete>{isCompleteString}</IsComplete>
      </ListItem>
    );
  };
    
    
  const ListItem = styled.div.attrs<{ index: number }>((props) => {
    return {
      index: props.index
    };
  })`
 display: flex;
  flex-direction: row;
  padding: 15px;
  border-bottom: 1px solid #8b4513;
  background-color: ${(props) => props.index % 2 ? "#f5f5dc" : "#fffaf0"};
  justify-content: space-between;
  align-items: center;
  `
    
  const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #8b4513;
  background-color: #d2b48c;
  align-items: center;
  justify-content: space-between;
`;

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
  width: 10px; 
`
const PlanId = styled.text`
  ${listItemCommon}
  width: 80px; 
`
const BookId = styled.text`
${listItemCommon}
width: 110px; 
`
const ExpiredDate = styled.text`
${listItemCommon}
width: 140px; 
`
const IsComplete = styled.text`
${listItemCommon}
width: 120px; 
`



 
export default ReadingPlan;