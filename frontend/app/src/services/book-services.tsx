import axios from 'axios';

const API_URL = 'http://192.168.0.136:8080'

class BookService {
    async getBooks() {
        return await axios.get(API_URL + '/book')
    }

    async getById(_id: string) {
        return await axios.get(API_URL + `/book/${_id}`)
    }
    
}

export default new BookService()