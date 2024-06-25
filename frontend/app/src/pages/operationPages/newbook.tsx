import React, { useState } from "react";
import styled from "styled-components";
import bookServices from "../../services/book-services";

interface Book {
    isbn: number;
    title: string;
    author: string;
    price: number;
    category: string;
    edition: number;
    current_page: number;
}

interface ServiceBook {
    //jwt_token: string,
    ISBN: string;
    book_title: string;
    author: string;
    price: number;
    category: string;
    edition: number;
    current_page: number;
}

const testBookState = {
    isbn: 1000000000,
    title: 'testing',
    author: 'test',
    price: 0,
    category: 'test',
    edition: 1,
    current_page: 0,
};

const initialBookState = {
    isbn: 0,
    title: '',
    author: '',
    price: 0,
    category: '',
    edition: 0,
    current_page: 0,
};

const NewBook = () => {
    const [book, setBook] = useState<Book>(initialBookState);
    //const [bookList, setBookList] = useState<Book[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleBtnClick = async () => {
        const newBook: Book = {
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            price: book.price,
            category: book.category,
            edition: book.edition,
            current_page: book.current_page,
        };

        try {
            console.log('add book')
            
            if( newBook.isbn < 1000000000 ||
                newBook.title == '' ||
                newBook.edition < 0 ||
                newBook.current_page < 0
                // newBook.author == '' 
            ){
                throw("invalid input")
            }
            
            // 呼叫 BookService 的 addBooks 方法
            await bookServices.addBooks(
                newBook.isbn,
                newBook.title,
                newBook.author,
                newBook.price,
                newBook.category,
                newBook.edition,
                newBook.current_page
            );

            // 將新書籍添加到本地的書籍列表
            //setBookList([...bookList, newBook]);
            setBook(initialBookState);  // 清空輸入
            setErrorMessage(null);  // 清除錯誤訊息
        } catch (error) {
            // 處理錯誤
            if(error == "invalid input"){
                setErrorMessage("請正確的輸入書籍資訊")
            }
            else{
                setErrorMessage("新增書籍失敗，請稍後再試");
            }
        }
    };

    return (
        <Container>
            <Title>新增書籍</Title>
            {errorMessage && <Error>{errorMessage}</Error>}
            <Label>ISBN</Label>
            <Input
                name="isbn"
                type="number"
                min="0"
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
            {/*
            <BookList>
                {bookList.map((book, index) => (
                    <BookItem key={index}>
                        {`ISBN: ${book.isbn}, 書名: ${book.title}, 作者: ${book.author}, 價格: ${book.price}, 類別: ${book.category}, 版次: ${book.edition}, 已讀頁數: ${book.current_page}`}
                    </BookItem>
                ))}
            </BookList>*/}
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

const Error = styled.div`
    color: red;
    margin-bottom: 20px;
    text-align: center;
`;

export default NewBook;
