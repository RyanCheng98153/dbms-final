import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import PlanService from  "../../services/plan-services"
import planServices from "../../services/plan-services";

interface Plan {
    bookId: number;
    date: Date;
    finished: boolean;
}

const initialPlanState = {
    bookId: '',
    date: new Date(),
    finished: false, // 預設為false
};

const NewPlan = () => {
    const [plan, setPlan] = useState(initialPlanState);
    const [planList, setPlanList] = useState<Plan[]>([]);

    const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlan({ ...plan, finished: e.target.checked });
    };

    const handleDateChange = (date: Date | null) => {
        if (date === null) return;
        setPlan({ ...plan, date }); 
    };
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const handlePlanSubmit = async() => {
        const newPlan: Plan = {
            bookId: parseInt(plan.bookId),
            date: plan.date,
            finished: plan.finished,
        };
        await PlanService.addPlan(parseInt(plan.bookId),formatDate(plan.date),plan.finished);
        setPlanList([...planList, newPlan]);
        setPlan(initialPlanState);
    };
    return (
        <Container>
        <div>
            <Title>新增計畫</Title>
            <input
                name="bookId"
                value={plan.bookId}
                onChange={handlePlanInputChange}
                placeholder="書籍ID"
            />
            <DatePicker
                selected={plan.date}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
            />
            <div>
                <label> {/*是否完成*/ }
                    <input
                        type="checkbox"
                        checked={plan.finished}
                        onChange={handleCheckboxChange}
                    />
                    完成
                </label>
            </div>
            <button onClick={handlePlanSubmit}>提交</button>
        </div>
        </Container>
    );
};

export default NewPlan;

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 40px;
    padding-top: 20px;
    border-radius: 20px;
    background: #f0f0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    color: #333;
`;

const Title = styled.h2`
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;