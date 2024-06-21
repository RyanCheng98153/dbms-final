import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class NotesService {
  async getNotes(book_id: number) {
    return await axios.get(`${API_URL}/notes/${book_id}`);
  }

  async addNote(data: any) {
    return await axios.post(`${API_URL}/add_note`, data);
  }

  async updateNote(data: any) {
    return await axios.put(`${API_URL}/update_note`, data);
  }

  async deleteNote(note_id: any) {
    return await axios.delete(`${API_URL}/delete_note/${note_id}`);
  }
}

export default new NotesService();
