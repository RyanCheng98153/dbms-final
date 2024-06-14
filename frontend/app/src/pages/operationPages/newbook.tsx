import React, { useState } from "react";
import styled from "styled-components";

interface Book {
    isbn: number;
    title: string;
    author: string;
    price: number;
    category: string;
    edition: number;
    current_page: number;
}

const initialBookState = { //輸入框預設是空的
    isbn: '',
    title: '',
    author: '',
    price: '',
    category: '',
    edition: '',
    current_page: '',
};

const NewBook = () => {
    const [book, setBook] = useState(initialBookState);
    const [bookList, setBookList] = useState<Book[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {//每次輸入都會調用一次handleInputChange
        const { name, value } = e.target;  //name代表isbn或title那些... value代表輸入的值
        setBook({ ...book, [name]: value }); //將結果傳到"book"中，送出時就可以送book的資訊出去
    };

    const handleBtnClick = () => {
        const newBook: Book = {
            isbn: parseInt(book.isbn),  //字串轉成int
            title: book.title,
            author: book.author,
            price: parseFloat(book.price),
            category: book.category,
            edition: parseInt(book.edition),
            current_page: parseInt(book.current_page),
        };

        setBookList([...bookList, newBook]); //將原先的booklist新增一個newBook
        setBook(initialBookState);  // 清空輸入
    };

    return (
        <div>
            
            <Container>
                <input name="isbn" value={book.isbn} onChange={handleInputChange} placeholder="ISBN" />  {/*placehoder代表提醒邊要輸入甚麼，是透明的字*/}
            </Container>
            <Container>
                <input name="title" value={book.title} onChange={handleInputChange} placeholder="Book Title" />
            </Container>
            <Container>
                <input name="author" value={book.author} onChange={handleInputChange} placeholder="Author" />
            </Container>
            <Container>
                <input name="price" value={book.price} onChange={handleInputChange} placeholder="Price" />
            </Container>
            <Container>
                <input name="category" value={book.category} onChange={handleInputChange} placeholder="Category" />
            </Container>
            <Container>
                <input name="edition" value={book.edition} onChange={handleInputChange} placeholder="Edition" />
            </Container>
            <Container>
                <input name="current_page" value={book.current_page} onChange={handleInputChange} placeholder="Current Page" />
            </Container>
            
            
            
            <button onClick={handleBtnClick}>提交</button>
            <ul>
                {bookList.map((book, index) => (
                    <li key={index}>
                        {`ISBN: ${book.isbn}, Title: ${book.title}, Author: ${book.author}, Price: ${book.price}, Category: ${book.category}, Edition: ${book.edition}, Current Page: ${book.current_page}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewBook;

const Container = styled.div`
    background-color: lightblue;
`



{/*import React, { useState } from "react";


interface Book {
    isbn:number,
    title:string,
    author:string,
    price:number,
    category:string,
    edition:number,
    current_page:number
}

const initialBookState: Book = {
    isbn: 0,
    title: "",
    author: "",
    price: 0,
    category: "",
    edition: 0,
    current_page: 0,
};

const NewBook = () => {
    const [book, setBook] = useState<Book>(initialBookState);
    const [bookList, setBookList] = useState<Book[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleBtnClick = () => {
        setBookList([...bookList, book]);
        setBook(initialBookState);  // 清空输入框
    };

    return (
        <div>
            <input name="isbn" value={book.isbn} onChange={handleInputChange} placeholder="ISBN" />
            <input name="title" value={book.title} onChange={handleInputChange} placeholder="Book Title" />
            <input name="author" value={book.author} onChange={handleInputChange} placeholder="Author" />
            <input name="price" value={book.price} onChange={handleInputChange} placeholder="Price" />
            <input name="category" value={book.category} onChange={handleInputChange} placeholder="Category" />
            <input name="edition" value={book.edition} onChange={handleInputChange} placeholder="Edition" />
            <input name="current_page" value={book.current_page} onChange={handleInputChange} placeholder="Current Page" />
            <button onClick={handleBtnClick}>提交</button>
            <ul>
                {bookList.map((book, index) => (
                    <li key={index}>
                        {`ISBN: ${book.isbn}, Title: ${book.title}, Author: ${book.author}, Price: ${book.price}, Category: ${book.category}, Edition: ${book.edition}, Current Page: ${book.current_page}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewBook;
*/}