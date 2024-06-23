import React, { useState } from "react";
import styled from "styled-components";
import bookServices from "../../services/book-services";
import historyServices from "../../services/history-services";

interface bookProp {
  id: number;
  isbn: number;
  title: string;
  author: string;
  price: number;
  category: string;
  edition: number;
  current_page: number;
}

interface IBook{
    id: number
    ISBN: string,
    book_title: string,
    author: number,
    price: number,
    category: number,
    edition: number,
    current_page: number,
  }
  
interface BookHistory {
  id: number;
  time_stamp: Date;
  book_id: number;
  book_page: number;
  note: string;
}

const initialBookHistoryState = {
  id: 0,
  time_stamp: new Date(),
  book_id: 0,
  book_page: 0,
  note: "",
};

const NewBookmark: React.FC = () => {
  const [masterbooks, setMasterBooks] = useState<bookProp[]>([
    {
        id: 0,
        isbn: 100000000,
        title: '測試 & test',
        author: 'robot',
        price: 0,
        category: '測試書籍',
        edition: 0,
        current_page: 0
    }
  ])
  const [filteredBooks, setFilteredBooks] = useState<bookProp[]>([]);
      
  const [bookmark, setBookHistory] = useState<BookHistory>(initialBookHistoryState);
  const [bookmarkList, setBookHistoryList] = useState<BookHistory[]>([]);
  
  const [searchInput, setSearchInput] = useState<string>('');
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  React.useEffect( () => {
    const fetchData = async () => {
      try {
        // console.log('fetched')
        const response = await bookServices.getBooks()
        if(!response) {console.log('no data in response'); return;}
        const responseBooks:bookProp[] = response.data.map(
          ( item:IBook ) => {
            return {
              id: item.id,
              isbn: item.ISBN,
              title: item.book_title,
              author: item.author,
              price: item.price,
              category: item.category,
              edition: item.edition,
              current_page: item.current_page
            }
          }
        )
        
        setMasterBooks(responseBooks)
      } catch (error) {
        console.error('An error occurred while fetching data:', error )
      }
    }
    fetchData()
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookHistory({ ...bookmark, [name]: value });
    setSearchInput(value);
    filterBooks(value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookHistory({ ...bookmark, [name]: value });
  };

  const filterBooks = (value: string) => {
    const filtered = masterbooks.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    if(value === ""){
        setFilteredBooks(masterbooks);
    }
    else {
        setFilteredBooks(filtered);
    }
        
  };

  const handleSelectBook = (selectedBook: bookProp) => {
    console.log("empty")
    if(selectedBook.title.length === 0){
        console.log("empty")
        return
    }
    setBookHistory({ ...bookmark, book_id: selectedBook.id });
    setSearchInput(selectedBook.title);
    setFilteredBooks([]);
  };

  const handleBtnClick = async () => {
    const newHistory = {
      //id: bookmarkList.length + 1,
      //time_stamp: new Date(),
      book_id: bookmark.book_id,
      book_page: bookmark.book_page,
      note: bookmark.note,
    };

    try {
      if (newHistory.book_id == 0) {throw "書籍名稱不存在，請輸入書籍名稱"}
      if (newHistory.book_page < 0) {throw "頁數不能小於0"}

      // 呼叫 BookService 的 addBooks 方法
      await historyServices.addHistory(
          newHistory.book_id,
          newHistory.book_page,
          newHistory.note
      );
      setBookHistory(initialBookHistoryState)

      setErrorMessage(null);  // 清除錯誤訊息
  } catch (error) {
      // 處理錯誤
      
      if (error !== null){
        setErrorMessage( "" + error )
      }
      //setErrorMessage("新增書籍失敗，請稍後再試");
  }

    //setBookHistoryList([...bookmarkList, newBookmark]);
    setBookHistory(initialBookHistoryState);
    setSearchInput('');
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Container>
      <Title>新增書籤</Title>
      {errorMessage && <Error>{errorMessage}</Error>}
      <Label>書籍名稱</Label>
      <Input
        type="text"
        name="title"
        value={searchInput}
        onClick={()=>{setFilteredBooks(masterbooks);}}
        onBlur={() => setDropdownOpen(false)} // Close dropdown on blur
        onFocus={() => setDropdownOpen(true)} // Open dropdown on focus
        onChange={handleTitleChange}
        placeholder="請輸入書籍名稱"
      />
      {filteredBooks.length > 0 && (
        <Dropdown>
          <DropdownList maxHeight={200}> {/* Adjust maxHeight as needed */}
            {filteredBooks.map((book) => (
              <Option key={book.id} onClick={() => handleSelectBook(book)}>
                {book.title}
              </Option>
            ))}
          </DropdownList>
        </Dropdown>
      )}
      <Label>書籍頁數</Label>
      <Input
        type="number"
        name="book_page"
        value={bookmark.book_page}
        onChange={handleInputChange}
        placeholder="請輸入書籍頁數"
      />
      <Label>備註</Label>
      <TextArea
        name="note"
        value={bookmark.note}
        onChange={handleInputChange}
        placeholder="請輸入備註"
      />
      <Button onClick={handleBtnClick}>提交</Button>
      {/*
       */}
      <BookmarkList>
        {bookmarkList.map((item) => (
          <BookmarkItem key={item.id}>
            {`書籍ID: ${item.book_id}, 書籍頁數: ${item.book_page}, 備註: ${item.note}`}
          </BookmarkItem>
        ))}
      </BookmarkList>
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
  background: #f0f0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
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

const TextArea = styled.input`
  width: 100%;
  height: 100px;
  padding: 12px;
  margin-bottom: 15px;
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

const BookmarkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const BookmarkItem = styled.li`
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

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Error = styled.div`
    color: red;
    margin-bottom: 20px;
    text-align: center;
`;

export default NewBookmark;