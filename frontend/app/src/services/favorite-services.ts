import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class FavoriteService {
    /*    
    interface IHistory{
        id: number,
        time_stamp: Date,
        book_id: number,
        bookpage: number,
        note: string
    }
    */
    async add_favorite(bookId: number) {
      return await axios.post(`${API_URL}/add_favorite`, {
        book_id: bookId
      });
  }
    async getfavorite() {
        return await axios.get(API_URL + '/view_data/favorites')
    }
    async deletefavorite(bookId: number) {
      // 進行 HTTP DELETE 請求來刪除特定書籍
      return axios.delete(API_URL + `/delete_favorite/${bookId}`);
  }
    

    
}

export default new FavoriteService()