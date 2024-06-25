import React, { useState, useEffect } from "react";
import bookServices from "../../services/book-services";
import historyServices from "../../services/history-services";
import styled from "styled-components";

// 定義書籍歷史記錄的屬性介面
interface BookHistoryProp {
    id: number,
    time_stamp: Date,
    book_id: number,
    book_page: number,
    note: string
}

// 定義後端獲取的書籍歷史記錄的介面
interface IHistory {
    id: number,
    time_stamp: Date,
    book_id: number,
    bookpage: number,
    note: string
}

// 定義書籍的屬性介面
interface IBook {
    id: number,
    ISBN: string,
    book_title: string,
    author: number,
    price: number,
    category: number,
    edition: number,
    current_page: number,
}

// 定義書籍的顯示屬性介面
interface BookProp {
    id: number,
    isbn: number,
    title: string,
    author: string,
    price: number,
    category: string,
    edition: number,
    current_page: number
}

// 定義初始的書籍狀態
const initialBookState = {
    isbn: '',
    title: '',
    author: '',
    price: '',
    category: '',
    edition: '',
    current_page: ''
};

const DeleteData = () => {
    // 狀態管理：選擇刪除的類型（書籍或閱讀歷史）
    const [deleteType, setDeleteType] = useState<string>("book");

    // 狀態管理：輸入框的值
    const [inputValue, setInputValue] = useState<string>("");

    // 狀態管理：顯示的書籍數據
    const [books, setBooks] = useState<BookProp[]>([]);

    // 狀態管理：顯示的歷史數據
    const [history, setHistory] = useState<BookHistoryProp[]>([]);

    // 獲取書籍數據
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await bookServices.getBooks();
                if (response && response.data) {
                    const responseBooks: BookProp[] = response.data.map((item: IBook) => ({
                        id: item.id,
                        isbn: item.ISBN,
                        title: item.book_title,
                        author: item.author,
                        price: item.price,
                        category: item.category,
                        edition: item.edition,
                        current_page: item.current_page
                    }));
                    setBooks(responseBooks);
                }
            } catch (error) {
                console.error('獲取書籍數據時出錯:', error);
            }
        };
        fetchBooks();
    }, []);

    // 獲取閱讀歷史數據
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await historyServices.getHistory();
                if (response && response.data) {
                    const responseHistory: BookHistoryProp[] = response.data.map((item: IHistory) => ({
                        id: item.id,
                        time_stamp: new Date(item.time_stamp),
                        book_id: item.book_id,
                        book_page: item.bookpage,
                        note: item.note
                    }));
                    setHistory(responseHistory);
                }
            } catch (error) {
                console.error('獲取閱讀歷史數據時出錯:', error);
            }
        };
        fetchHistory();
    }, []);

    // 下拉式選單變更處理函數
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeleteType(e.target.value);
    };

    // 輸入框變更處理函數
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // 刪除處理函數
    const handleDelete = async () => {
        try {
            if (deleteType === "book") {
                const response = await bookServices.deletebook(parseInt(inputValue));
                if (response.status === 200) {
                    alert("書籍刪除成功");
                    // 更新前端顯示數據
                    setBooks(books.filter(book => book.id !== parseInt(inputValue)));
                } else {
                    alert("書籍ID不存在");
                }
            } else if (deleteType === "history") {
                const response = await historyServices.deleteHistory(inputValue);
                if (response.status === 200) {
                    alert("閱讀歷史刪除成功");
                    // 更新前端顯示數據
                    setHistory(history.filter(item => item.id !== parseInt(inputValue)));
                } else {
                    alert("record_No不存在");
                }
            }
        } catch (error) {
            console.error('刪除數據時出錯:', error);
            alert("刪除失敗，請稍後再試");
        }
    };

    return (
        <Container>
            <Title>刪除數據</Title>
            <Label>選擇刪除類型</Label>
            <Select value={deleteType} onChange={handleSelectChange}>
                <option value="book">書籍</option>
                <option value="history">閱讀歷史</option>
            </Select>
            <Label>{deleteType === "book" ? "輸入書籍ID" : "輸入record_No"}</Label>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={deleteType === "book" ? "書籍ID" : "記錄號"}
            />
            <Button onClick={handleDelete}>刪除</Button>
        </Container>
    );
};

// Styled-components 樣式定義
const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 40px;
    padding-top: 20px;
    border-radius: 20px;
    background: #f0f0e0;
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

const Select = styled.select`
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
    padding: 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #0056b3;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export default DeleteData;
