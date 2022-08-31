import React, { useState } from 'react';
import AvailableExpense from './AvailableExpense';
import ExpenseBanner from './ExpenseBanner';

const Expense = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <ExpenseBanner date={date} setDate={setDate} />
            <AvailableExpense date={date}/>
        </div> 
    );
};

export default Expense;