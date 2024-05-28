import React from "react";
import List from "../components/list";

const books = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // Add more items as needed
]

const bookRecord = (item:{id:number, name:string}) => {
  return (
    <div>
      <div>{item.id}</div>
      <div>{item.name}</div>
    </div>
  );
}

const Books = () => {
    return (
        <div>
            <div>
                All booked
            </div>
            <List
              items={books}
              renderItem={bookRecord}
            />
            
        </div>
    );
};
 
export default Books;