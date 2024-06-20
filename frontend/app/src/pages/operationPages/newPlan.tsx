import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

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

    const handlePlanSubmit = () => {
        const newPlan: Plan = {
            bookId: parseInt(plan.bookId),
            date: plan.date,
            finished: plan.finished,
        };

        setPlanList([...planList, newPlan]);
        setPlan(initialPlanState);
    };

    return (
        <div>
            <h2>新增計畫</h2>
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
            <ul>
                {planList.map((plan, index) => (
                    <li key={index}>
                        {`ID: ${plan.bookId}, 日期: ${plan.date.toDateString()}, 完成: ${plan.finished}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewPlan;