import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'

class ReadingPlanService {
  async getPlans() {
    return await axios.get(API_URL + '/view_data/plans');
  }

  async addPlan(data:any) {
    return await axios.post(API_URL + '/add_plan', data);
  }

  async updatePlan(data:any) {
    return await axios.put(API_URL + '/update_plan', data);
  }

  async deletePlan(plan_id:any) {
    return await axios.delete(API_URL + `/delete_plan/${plan_id}`);
  }
}

export default new ReadingPlanService();
