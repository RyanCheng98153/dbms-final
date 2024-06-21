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
      //{ headers: { Authorization: `Bearer ${jwt_token}` },}
    )
  }
  // 新增刪除書籍的方法
  async deleteBook(bookId: string) {
    // 進行 HTTP DELETE 請求來刪除特定書籍
    return axios.delete(API_URL + `/delete_book/${bookId}`);
  }

}

export default new BookService()