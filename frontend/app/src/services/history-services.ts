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

    
    async addHistory(
        //jwt_token: string,
        book_id: number,
        book_page: number,
        note: string,
      ) {
        return axios.post(
          API_URL + '/add_history',
          {
            book_id: book_id,
            bookpage: book_page,
            note: note,
          },
          //{ headers: { Authorization: `Bearer ${jwt_token}` },}
        )
      }

    async deleteHistory(
      historyId: string
    ) {
      // 進行 HTTP DELETE 請求來刪除特定書籍
      return axios.delete(
        API_URL + `/delete_history/${historyId}`,{
        })
    }
    

    
}

export default new HistoryService()