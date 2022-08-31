import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from 'react-toastify';

const ExpenseModule = ({ date, expense ,setExpense}) => {
  const { name,_id} = expense;
  var today=new Date()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [user, loading, error] = useAuthState(auth);
 
  const formattedDate=format(date,'PP')
  const handleExpense = (e) => {
    e.preventDefault()
    const expenselist={
      expenseId: _id,
      expense: name,
      date: formattedDate,
      currentTime: e.target.time.value,
      empoyeeName: user.displayName,
      empoyeeEmail: user.email,
      itemName: e.target.itemName.value,
      specialNote: e.target.note.value,
      usnitCost: e.target.unitCost.value,
      quantity:e.target.quantity.value,
    }

    fetch('http://localhost:5000/expenselist', {
      method: "POST",
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(expenselist)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setExpense(null)
      })

  }
  return (
    <div>
      <input type="checkbox" id="expense-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="expense-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">{name}</h3>
          <form onSubmit={handleExpense} className="grid grid-cols-1 gap-4 justify-items-center mt-2">
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              disabled
              name="time"
              value={time}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName ||user?.email}
              className="input input-bordered w-full max-w-xs"
            />
            
            <input
              type="text"
              required
              name="itemName"
              placeholder="Item Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="note"
              placeholder="Special Note"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              required
              name="unitCost"
              placeholder="Unit Cost"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              required
              name="quantity"
              placeholder="Quantity"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              placeholder="Type here"
              className="btn btn-secondary w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModule;
