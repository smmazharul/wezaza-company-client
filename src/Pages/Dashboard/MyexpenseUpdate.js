import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyexpenseUpdate = () => {
    const {id}=useParams()
    const [updateExpense, setUpdateExpense] = useState({});
    
    useEffect( () =>{
        const url = `https://young-fortress-58661.herokuapp.com/dashboard/myexpense/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUpdateExpense(data));
    }, []);
    
    const handleUpdateExpense = event =>{
        event.preventDefault();
        const itemName = event.target.itemName.value;
        const specialNote = event.target.specialNote.value;
        const usnitCost = event.target.usnitCost.value;
        const quantity = event.target.quantity.value;

        const updatedExpense = {itemName, specialNote,usnitCost,quantity};

        // send data to the server
        const url = `https://young-fortress-58661.herokuapp.com/dashboard/myexpense/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedExpense)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('success', data);
            alert('users added successfully!!!');
            event.target.reset();
        })
    }
    return (
        <div>
             <h1 className='text-secondary font-bold' >Item ID: {id}</h1>
            <form onSubmit={handleUpdateExpense}  className="grid grid-cols-1 gap-4 justify-items-center mt-2 w-full">
        <input
            type="text"
            required
            name="itemName"
            placeholder="item Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="specialNote"
            placeholder="special Note "
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            required
            name="usnitCost"
            placeholder="usnit Cost"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            required
            name="quantity"
            placeholder="quantity "
            className="input input-bordered w-full max-w-xs"
          />
         
          <input
            type="submit"
            value="Update Expense"
            placeholder="Type here"
            className="btn btn-secondary w-full max-w-xs"
          />
        </form>
        </div>
    );
};

export default MyexpenseUpdate;