import axios from 'axios';
const API_URL = "http://192.168.0.0.1:5000n"

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
        expiredDate: Date,
        finished: boolean
    ) {
        return await axios.post(`${API_URL}/add_plan`,
            {
                book_Id: bookId,
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
}

export default new PlanService