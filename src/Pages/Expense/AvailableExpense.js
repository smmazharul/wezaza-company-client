import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseModule from "./ExpenseModule";

const AvailableExpense = ({ date }) => {
  const [expenseCatagories, setExpenseCatagories] = useState([]);
  const [expense, setExpense] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/expense")
      .then((res) => res.json())
      .then((data) => setExpenseCatagories(data));
  }, []);

  return (
    <div className="mt-12">
      <h1 className="text-xl text-secondary text-center font-bold">
        Available Expense {format(date, "PP")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {expenseCatagories.map((expenseCatagory) => (
          <ExpenseList
            key={expenseCatagory._id}
            expenseCatagory={expenseCatagory}
            setExpense={setExpense}
          />
        ))}
          </div>
          {expense && <ExpenseModule date={date} setExpense={setExpense} expense={ expense} />}
    </div>
  );
};

export default AvailableExpense;
