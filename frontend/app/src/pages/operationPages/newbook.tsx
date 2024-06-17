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

const initialBookState = {
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
        <Container>
            <Title>新增書籍</Title>
            <Label>ISBN</Label>
            <Input
                name="isbn"
                value={book.isbn}
                onChange={handleInputChange}
                placeholder="ISBN"
            />
            <Label>書名</Label>
            <Input
                name="title"
                value={book.title}
                onChange={handleInputChange}
                placeholder="書名"
            />
            <Label>作者</Label>
            <Input
                name="author"
                value={book.author}
                onChange={handleInputChange}
                placeholder="作者"
            />
            <Label>價格</Label>
            <Input
                name="price"
                value={book.price}
                onChange={handleInputChange}
                placeholder="價格"
            />
            <Label>類別</Label>
            <Input
                name="category"
                value={book.category}
                onChange={handleInputChange}
                placeholder="類別"
            />
            <Label>版次</Label>
            <Input
                name="edition"
                value={book.edition}
                onChange={handleInputChange}
                placeholder="版次"
            />
            <Label>已讀頁數</Label>
            <Input
                name="current_page"
                value={book.current_page}
                onChange={handleInputChange}
                placeholder="已讀頁數"
            />
            <Button onClick={handleBtnClick}>提交</Button>
            <BookList>
                {bookList.map((book, index) => (
                    <BookItem key={index}>
                        {`ISBN: ${book.isbn}, 書名: ${book.title}, 作者: ${book.author}, 價格: ${book.price}, 類別: ${book.category}, 版次: ${book.edition}, 已讀頁數: ${book.current_page}`}
                    </BookItem>
                ))}
            </BookList>
        </Container>
    );
};


const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 40px;
    padding-top: 20px;
    border-radius: 20px;
    background: #f0f0e0; /* 淺灰色背景 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    color: #333;
`;


const Title = styled.h2`
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin: 15px 0 5px;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: #007BFF;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
        outline: none;
    }
`;
const Button = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #feb47b, #ff7e5f);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
    }
`;

const BookList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
`;

const BookItem = styled.li`
    background-color: #fff;
    margin: 10px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export default NewBook;