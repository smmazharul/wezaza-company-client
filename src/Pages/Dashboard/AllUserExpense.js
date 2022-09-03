import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllUserExpense = () => {
    const [allUserExpense,setAllUserExpense]=useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/expenseall')
        .then(res=>res.json())
        .then(data=>{
            setAllUserExpense(data)
            setDisplayProducts(data)})
    },[])

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = allUserExpense.filter(expense => expense.empoyeeName?.toLowerCase().includes(searchText.toLowerCase()));
        console.log(matchedProducts)

        setDisplayProducts(matchedProducts);
    }
    return (
        <div className='mt-2'>
            <input type="text" onChange={handleSearch} placeholder="Search by Employee Name" className="mb-2 input   w-full max-w-xs "  />
            <div class="overflow-x-auto">
  <table class="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Empoyee Name</th>
        <th>Date</th>
        <th>Item Name</th>
        <th>Special Note</th>
        <th>Unit Cost</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {
        displayProducts.map((allExpense,index)=>(
            <tr>
        <th>{index + 1 }</th>
        <td>{allExpense.empoyeeName}</td>
        <td>{allExpense.date}</td>
        <td>{allExpense.itemName}</td>
        <td>{allExpense.specialNote}</td>
        <td>{allExpense.usnitCost}</td>
        <td>{allExpense.quantity} </td>
        <td>{allExpense.usnitCost * allExpense.quantity}</td>
        
      </tr>

        ))
      }
      {/* <tr>
        <td colspan="6"></td>
        <td className='font-bold text-purple-500' >My Total Expense</td>
        <td className='font-bold text-purple-500' >{total}</td>
      </tr> */}
    
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUserExpense;