import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class HistoryService {
    /*    
    interface IHistory{
        id: number,
        time_stamp: Date,
        book_id: number,
        bookpage: number,
        note: string
    }
    */
    
    async getHistory() {
        return await axios.get(API_URL + '/view_data/history')
    }

    /*
    async getById(_id: string) {
        return await axios.get(API_URL + `/book/${_id}`)
    }
    */ 

    /*
    async addHistory(
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
          API_URL + '/add_history',
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
    */

    
}

export default new HistoryService()