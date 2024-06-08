import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class BookService {
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
}

export default new BookService()