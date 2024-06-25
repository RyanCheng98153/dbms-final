import axios from 'axios';
const API_URL = 'http://127.0.0.1:5000'

class PlanService {
    /*
    interface Plan {
        bookId: number;
        expiredDate: Date;
        finished: boolean;
    }
    */

    async getPlan () {
        return await axios.get( API_URL + '/view_data/plan' )
    }

    async addPlan (
        bookId: number,
        expiredDate: string,
        finished: boolean
    ) {
        return await axios.post(`${API_URL}/add_plan`,
            {
                book_id: bookId,
                expired_date: expiredDate,
                is_complete: finished
            }
        )
    }

    async deletePlan (
        planId: number,
    ) {
        return await axios.delete(`${API_URL}/delete_data`, {
            data:{
                table: '閱讀計劃',
                id: planId
            }
        })
    }
    async getbookname_by_id(bookId: number){
        console.log("this_is_return:",await axios.get(`${API_URL}/search_book/${bookId}`));
        return await axios.get(`${API_URL}/search_book/${bookId}`);
    }
    
    async search_id_by_book_title(book_title:string){
        return await axios.get(`${API_URL}/search_id_by_book_title/${book_title}`);
    }

}export default new PlanService()