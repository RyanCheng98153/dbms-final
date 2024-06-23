import React, { useState } from "react";
import styled from "styled-components";
import bookServices from "../../services/book-services";
import { categoryOptions } from "../../components/textResources";

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
    ISBN: number;
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

/*
// 快速加資料的方法
const testbook: Book[] = [
    {isbn:9789867412, title:"麥田捕手", author:"J.D. Salinger", price:450, category:"文學", edition:1, current_page:100},
    {isbn:9789578626, title:"R語言生物資訊", author:"Rstudio Group", price:320, category:"科學", edition:2, current_page:150},
    {isbn:9789573286, title:"摩訶婆羅多", author:"Unknown", price:520, category:"歷史", edition:3, current_page:200},
    {isbn:9789578691, title:"純粹理性批判", author:"Kant", price:300, category:"哲學", edition:1, current_page:250, },
    {isbn:9789866785, title:"資本論", author:"K. Marx", price:420, category:"社會學", edition:2, current_page:300, },
    {isbn:9789573486, title:"傲慢與偏見", author:"Jane Austen", price:320, category:"西洋文學", edition:3, current_page:320, },
    {isbn:9789578964, title:"1984", author:"George Orwell", price:520, category:"西洋文學", edition:1, current_page:520, },
    {isbn:9789766485, title:"紅樓夢", author:"曹雪芹", price:300, category:"中國文學", edition:2, current_page:300, },
    {isbn:9789867413, title:"遠大前程", author:"Charles Dickens", price:400, category:"西洋文學", edition:1, current_page:450, },
    {isbn:9789578627, title:"物種起源", author:"Charles Darwin", price:350, category:"科學", edition:2, current_page:500, },
    {isbn:9789573287, title:"大衛科波菲爾", author:"Charles Dickens", price:450, category:"西洋文學", edition:3, current_page:150, },
    {isbn:9789578692, title:"尼采全集", author:"Friedrich Nietzsche", price:600, category:"哲學", edition:1, current_page:100, },
    {isbn:9789866786, title:"查拉圖斯特拉如是說", author:"Friedrich Nietzsche", price:400, category:"哲學", edition:2, current_page:200, },
    {isbn:9789573487, title:"瓦爾登湖", author:"Henry David Thoreau", price:300, category:"文學", edition:3, current_page:250, },
    {isbn:9789578965, title:"百年孤寂", author:"Gabriel Garcia Marquez", price:350, category:"文學", edition:1, current_page:300, },
    {isbn:9789766486, title:"堂吉訶德", author:"Miguel de Cervantes", price:500, category:"西洋文學", edition:2, current_page:350, },
    {isbn:9789867414, title:"變形記", author:"Franz Kafka", price:250, category:"文學", edition:1, current_page:400, },
    {isbn:9789578628, title:"三體", author:"劉慈欣", price:450, category:"科幻", edition:2, current_page:450, },
    {isbn:9789573288, title:"哈利波特", author:"J.K. Rowling", price:600, category:"奇幻", edition:3, current_page:500, },
    {isbn:9789578693, title:"冰與火之歌", author:"George R.R. Martin", price:700, category:"奇幻", edition:1, current_page:550, }
]

const handleInsertClick = async () => {
    const newBook:Book = testbook[0]
    // 呼叫 BookService 的 addBooks 方法
    await bookServices.addBooks(
        newBook.isbn.toString(),
        newBook.title,
        newBook.author,
        newBook.price,
        newBook.category,
        newBook.edition,
        newBook.current_page
    );
};
*/



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
            
            // 呼叫 BookService 的 addBooks 方法
            await bookServices.addBooks(
                newBook.isbn.toString(),
                newBook.title,
                newBook.author,
                newBook.price,
                newBook.category,
                newBook.edition,
                newBook.current_page
            );

            setErrorMessage(null);  // 清除錯誤訊息
        } catch (error) {
            // 處理錯誤
            setErrorMessage("新增書籍失敗，請稍後再試");
            
        }
    };

    // dropdown of category 下拉式選單:分類
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSelectCategory = (selectCategory: string) => {
        setBook({ ...book, ['category']: selectCategory });
        setDropdownOpen(false)
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
            <DropdownInput
                type="text"
                name="title"
                value={book.category}
                onClick={()=>{setDropdownOpen(true)}}
                onChange={handleOptionSelect}
                placeholder="請選擇類別"
                readOnly
            />
            {dropdownOpen && (
              <Dropdown>
                <DropdownList maxHeight={200}> {/* Adjust maxHeight as needed */}
                  {categoryOptions.map((category) => (
                    <Option key={category} onClick={() => handleSelectCategory(category)}>
                    {category}
                    </Option>
                  ))}
                </DropdownList>
              </Dropdown>
            )}
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

const DropdownInput = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
      outline: none;
    }
  `;

const Dropdown = styled.div`
    //position: absolute;
    //width: 500px;
    width: 100%;
    background-color: #f9f9f9;
    //z-index: 1;
  `;
  
  const DropdownList = styled.div<{ maxHeight: number }>`
    max-height: ${(props) => props.maxHeight}px;
    overflow-y: auto;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  
  const Option = styled.div`
    padding: 10px;
    cursor: pointer;
    //background-color: yellow;
    &:hover {
      background-color: #f1f1f1;
    }
  `;

export default NewBook;
