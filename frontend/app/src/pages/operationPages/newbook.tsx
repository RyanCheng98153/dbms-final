import React, { useEffect, useState } from "react";

interface itemProp {
    id:number,
    isbn:number,
    author:string
}

const NewBook = () => {
    const BookItem:itemProp = {
        id:1,
        isbn:2215444848,
        author:"chen,chen-cheng"
    }

    const [BookObject, setBookObject] = useState<itemProp>({
        id:1,
        isbn:2215444848,
        author:"chen,chen-cheng"
    })

    const [id, setId] = useState<number>(132)
    const [isbn, setISBN] = useState<string>('15468489')
    const [author, setAuthor] = useState<string>("chen,chen-cheng")
    

    return (
        <div style={{padding:15}}>
            <input
                onChange={(e)=>{setISBN(e.target.value);console.log(e)}}
            />
            <div>
                input:{isbn}
            </div>
        </div>
    );
};
 
export default NewBook;