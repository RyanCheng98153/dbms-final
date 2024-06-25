<<<<<<< HEAD
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class AuthorService {

    async getAuthorInfo(authorName: string) {
        return await axios.get(API_URL + `/get_author/${authorName}`)
    }

    async addAuthor (
        authorName: string,
        introduction: string,
        nationality: string,
        birthYear: number
    ) {
        return await axios.post(`${API_URL}/add_author`,
            {
                author_name: authorName,
                introduction: introduction,
                nationality: nationality,
                Birth_year: birthYear
            }
        )
    }

    async updateAuthorInfo(
        authorId: number,
        authorName: string,
        introduction: string,
        nationality: string,
        birthYear: number
    ) {
        return await axios.put(`${API_URL}/update_author`,
            {
                author_id:authorId,
                author_name: authorName,
                introduction: introduction,
                nationality: nationality,
                Birth_year: birthYear
            }
        )
    }
}

=======
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class AuthorService {
    async getAuthorInfo(
        authorName: string
    ) {
        return await axios.get(API_URL + `/get_author/${authorName}`)
    }

    async addAuthor (
        authorName: string,
        introduction: string,
        nationality: string,
        birthYear: string
    ) {
        return await axios.post(`${API_URL}/add_author`,
            {
                author_name: authorName,
                introduction: introduction,
                nationality: nationality,
                Birth_year: birthYear
            }
        )
    }

    async updateAuthorInfo(
        authorId: string,
        authorName: string,
        introduction: string,
        nationality: string,
        birthYear: Date
    ) {
        return await axios.put(`${API_URL}/add_plan`,
            {
                author_id:authorId,
                author_name: authorName,
                introduction: introduction,
                nationality: nationality,
                Birth_year: birthYear
            }
        )
    }
}

>>>>>>> a89cb47486bec4bb0e07d516e86338075fb8790a
export default new  AuthorService