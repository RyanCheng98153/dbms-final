import List from "../../components/list";
import styled from "styled-components";
import { useState, useEffect ,useRef} from "react";
import bookServices from "../../services/book-services";
import favoriteServices from "../../services/favorite-services";
interface bookProp {
  id:number,
  isbn:number,
  title:string,
  author:string,
  price:number,
  category:string,
  edition:number,
  current_page:number
}

interface IBook{
  id: number
  ISBN: number,
  book_title: string,
  author: string,
  price: number,
  category: number,
  edition: number,
  current_page: number,
}
interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>新增筆記</h2>
        <div>
          <Label>標題:</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>內容:</Label>
          <Textarea></Textarea>
        </div>
        <Button onClick={onClose}>新增</Button>
      </Modal>
    </Overlay>
  );
};

const NOTE_display: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>筆記</button>
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

const Books = () => {
  
  // 定義一個 React 函數式組件 App
  // 返回組件的 JSX 結構

  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  const readpdf = async (bookId: number) => {
    const pdfUrl:any = await bookServices.viewPDF(bookId.toString());
    window.open(pdfUrl, '_blank');  // 在新標籤頁中打開 PDF
  }
  // const [press, setPress] = useState<boolean>(false)
  const handleDelete = async (bookId: number) => {
    const isConfirmed = window.confirm("確定要將這本書從書籍中移除嗎？");
    if (!isConfirmed) return;
    await bookServices.deleteBook(bookId.toString());
    setBooks(books.filter(book => book.id !== bookId));
  }
  const handleUploadPDF = async (event: React.ChangeEvent<HTMLInputElement>, bookId: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('book_id', bookId.toString());

    try {
      await bookServices.uploadPDF(bookId.toString(), formData);
      alert('PDF 上傳成功');
    } catch (error) {
      alert('PDF 上傳失敗');
    }
  };


  const [books, setBooks] = useState<bookProp[]>([
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
  
  useEffect( () => {
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
        
        setBooks(responseBooks)
      } catch (error) {
        console.error('An error occurred while fetching data:', error )
      }
    }
    fetchData()
  }, [])
  const ListHeader = () => {
    return (
      <HeaderContainer>
        <Index>{ '.' }</Index>
        {<BookId >{'id'}</BookId>}
        <BookIsbn>{'ISBN'}</BookIsbn>
        <BookTitle>{'book title'}</BookTitle>
        <BookAuthor>{'author'}</BookAuthor>
        <BookPrice>{'price'}</BookPrice>
        <BookCategory>{'category'}</BookCategory>
        <BookEdition>{'edition'}</BookEdition>
        <CurrentPage>{'current page'}</CurrentPage>
        <Operation>操作</Operation>
      </HeaderContainer>
    )
  }
  
  const bookRecord = (book:bookProp, index:number) => {
    
    const handleAdd_favorite = async (bookId: number) => {
      try {
        await favoriteServices.add_favorite(bookId);
        alert(`書籍ID ${bookId} 已加入我的最愛`);
      } catch (error) {
        alert('這本書已經在我的最愛了');
      }
    };
    return (
      <ListItem index={index}>
        <Index>{ index+1 }</Index>
        {<BookId >{book.id}</BookId>}
        <BookIsbn>{book.isbn}</BookIsbn>
        <BookTitle>{book.title}</BookTitle>
        <BookAuthor>{book.author}</BookAuthor>
        <BookPrice>{book.price}</BookPrice>
        <BookCategory>{book.category}</BookCategory>
        {
          (book.edition).toString()[0] == '第'
          ? <BookEdition>{book.edition}</BookEdition>
          : <BookEdition>{'第'+book.edition+'版'}</BookEdition>
        }
        <CurrentPage>{book.current_page}</CurrentPage>
        <Operation>
        <Favorite_Button onClick={() => handleAdd_favorite(book.id)}>加入最愛</Favorite_Button>
        <Delete_Button onClick={() => handleDelete(book.id)}>刪除書籍</Delete_Button>
        <Upload_Button onClick={handleButtonClick}>上傳pdf</Upload_Button>
          <input
            type="file"
            accept="application/pdf"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={(event) => handleUploadPDF(event, book.id)}
          />
        <Read_Button onClick={() => readpdf(book.id)}>閱讀pdf</Read_Button>
        <NOTE_display />
        </Operation>
      </ListItem>
    );
  }
  

  return (
    <div>
        <ListHeader/>
        <List
          // items={testBooks}
          items={books}
          renderItem={bookRecord}
        />
    </div>
  );
};


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
  background-color: wheat;
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
const Operation = styled.text`
  ${listItemCommon}
  width: 70px;
`;
const Index = styled.text`
  ${listItemCommon}
  text-align: left;
  width: 20px; 
`
const BookId = styled.text`
  ${listItemCommon}
  width: 30px; 
`
const BookIsbn = styled.text`
  ${listItemCommon}
  width: 120px; 
`
const BookTitle = styled.text`
  ${listItemCommon}
  width: 120px; 
`
const BookAuthor = styled.text`
  ${listItemCommon}
  width: 70px; 
`
const BookPrice = styled.text`
  ${listItemCommon}
  width: 50px;
`
const BookCategory = styled.text`
  ${listItemCommon}
  width: 80px;
`
const BookEdition = styled.text`
  ${listItemCommon}
  width: 60px;
`
const CurrentPage = styled.text`
  ${listItemCommon}
  width: 100px;
`

const Favorite_Button = styled.button`
  margin-left: 12px;
  margin-bottom: 3px;
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

const Delete_Button = styled.button`
  margin-left: 12px;
  margin-bottom: 3px;
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

const Upload_Button = styled.button`
  margin-left: 12px;
  margin-bottom: 3px;
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

const Read_Button = styled.button`
  margin-left: 12px;
  margin-bottom: 3px;
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

const Note_Button = styled.button`
  margin-left: 12px;
  margin-bottom: 3px;
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

//note css

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.span`
  float: right;
  cursor: pointer;
  font-size: 24px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: calc(100% - 22px);
  padding: 10px;
  height: 100px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
export default Books;