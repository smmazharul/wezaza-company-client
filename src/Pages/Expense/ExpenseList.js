import React from "react";

const ExpenseList = ({ expenseCatagory, setExpense, }) => {
  const { name, } = expenseCatagory;
  var today=new Date()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

 
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl mt-5">
      <div className="card-body text-center">
        <h2 className="text-2xl text-secondary text-center">{name}</h2>
        {/* <p>
          {slots.length > 0 ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500">No Slot Avaiable </span>
          )}
        </p> */}
        <p>{time }</p>
        <div className="card-actions justify-center">
          <label
            onClick={() => setExpense(expenseCatagory)}
            htmlFor="expense-modal"
            className="btn btn-secondary text-white uppercase"
          >
            Submit Expense
          </label>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
