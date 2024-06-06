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
}

export default new BookService()