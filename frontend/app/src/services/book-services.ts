import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class BookService {
  /*
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
  */

  async getBooks() {
    return await axios.get(API_URL + '/view_data/books')
  }
  /*
  async getById(_id: string) {
      return await axios.get(API_URL + `/book/${_id}`)
  }
  */

  async addBooks(
    //jwt_token: string,
    ISBN: string,
    book_title: string,
    author: string,
    price: number,
    category: string,
    edition: number,
    current_page: number,
  ) {
    return axios.post(
      API_URL + '/add_book',
      {
        ISBN: ISBN,
        book_title: book_title,
        author: author,
        price: price,
        category: category,
        edition: edition,
        current_page: current_page
      },
      //{ headers: { Authorization: Bearer ${jwt_token} },}
    )
  }
  // 新增刪除書籍的方法
  async deleteBook(
    bookId: string
  ) {
    // 進行 HTTP DELETE 請求來刪除特定書籍
    return axios.delete(
      API_URL + `/delete_data`,{
        data:{
          table: '書籍',
          id: bookId
        }
      })
  }
  async uploadPDF (formData:FormData) {
    return axios.post(API_URL +'/upload_pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  //文件上傳
      }
    });
  };
  async viewPDF(bookId: string): Promise<string> {
    return API_URL + '/view_pdf/' + bookId;
  } 
  async add_note(bookId: string, title: string, content: string) {
    try {
      const response = await axios.post(API_URL+'/add_note', {
        book_id: bookId,
        title: title,
        content: content
      });
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }
  async viewnote(bookId: number) {
    const response = await axios.get(`${API_URL}/notes/${bookId}`);
    return response;
  }
  async delete_note(note_id: number) {
    return await axios.delete(`${API_URL}/delete_note/${note_id}`);
  }
}

export default new BookService()