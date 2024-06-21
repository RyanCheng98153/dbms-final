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
    author: number,
    price: number,
    category: number,
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

  
  // 添加搜索書籍的方法
  async searchByCategory(category: string) {
    return await axios.get(API_URL + '/search_by_category', {
      params: { category }
    });
  }

  // 新增刪除書籍的方法
  async deleteBook(bookId: string) {
    // 進行 HTTP DELETE 請求來刪除特定書籍
    return axios.delete(API_URL + `/delete_book/${bookId}`);
  }

  // 更新書籍的頁數
  async updatePage(bookId: number, currentPage: number) {
    return axios.put(`${API_URL}/update_page`, {
      book_id: bookId,
      current_page: currentPage,
    });
  }

  // 上傳書籍的 PDF 檔案
  async uploadPDF(bookId: number, file: File) {
    const formData = new FormData();
    formData.append('book_id', bookId.toString());
    formData.append('file', file);

    return axios.post(`${API_URL}/upload_pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // 查看書籍的 PDF 檔案
  async viewPDF(bookId: number) {
    return axios.get(`${API_URL}/view_pdf/${bookId}`, {
      responseType: 'blob'
    });
  }


}

export default new BookService()