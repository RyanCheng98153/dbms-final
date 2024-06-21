import styled from "styled-components"
import List from "../../components/list"
import { isDocument } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import ReadingPlanService from "../../services/reading-plan-services";

interface planProp {
    id:number,
    book_id:number,
    expired_date:Date,
    is_complete:boolean
  }
  /*
const testPlan:planProp[] = [
    {
        id:1,
        book_id:1,
        expired_date: new Date( new Date( "2024-7-31" ).toISOString() ),
        is_complete:false
    },
    {
        id:2,
        book_id:4,
        expired_date: new Date( new Date( "2024-8-31" ).toISOString() ),
        is_complete:true
    },
]
 
const ReadingPlan = () => {
    return (
        <div>
            <ListHeader/>
            <List
              items={testPlan}
              renderItem={PlanRecord}
            />
        </div>
    );
};
*/
const ReadingPlan = () => {
  const [plans, setPlans] = useState<planProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadingPlanService.getPlans();
        if (response && response.data) {
          const responsePlans: planProp[] = response.data.map((item: any) => ({
            id: item.id,
            book_id: item.book_id,
            expired_date: new Date(item.expired_date).toLocaleDateString(),
            is_complete: item.is_complete
          }));
          setPlans(responsePlans);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ListHeader />
      <List items={plans} renderItem={PlanRecord} />
    </div>
  );
};


const ListHeader = () => {
    return (
      <HeaderContainer>
        <Index>{'.'}</Index>
        <PlanId>{'record_No'}</PlanId>
        <BookId>{'book_id'}</BookId>
        <ExpiredDate>{'Expried_date'}</ExpiredDate>
        <IsComplete>{'is_complete'}</IsComplete>
      </HeaderContainer>
    );
  };

   
const PlanRecord = (record:planProp, index:number) => {
    // 確保 record.expired_date 是一個 Date 對象
    let recordDate = new Date(record.expired_date);
    let recordDateString:string = recordDate.getFullYear() + '/' + recordDate.getMonth() + '/' + recordDate.getDay()
    let isCompleteString:string = record.is_complete ? 'True' : 'False' 
    return (
      <ListItem index={index}>
        <Index>{ index+1 }</Index>
        <PlanId>{record.id}</PlanId>
        <BookId>{record.book_id}</BookId>
        <ExpiredDate>{recordDateString}</ExpiredDate>
        <IsComplete>{isCompleteString}</IsComplete>
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