import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SpecificUserDataShow = () => {
  const { email } = useParams();
  const [allUserExpense, setAllUserExpense] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  useEffect(() => {
    fetch(
      `https://young-fortress-58661.herokuapp.com/expenselist/expense?empoyeeEmail=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllUserExpense(data);
        setDisplayProducts(data);
        // console.log(data);
      });
  }, [email]);


const months=[
  {id:1,name:"Jan"},
  {id:2,name:"Feb"},
  {id:3,name:"Mar"},
  {id:4,name:"Apr"},
  {id:5,name:"May"},
  {id:6,name:"Jun"},
  {id:7,name:"Jul"},
  {id:8,name:"Aug"},
  {id:9,name:"Sep"},
  {id:10,name:"Oct"},
  {id:11,name:"Nov"},
  {id:12,name:"Dec"},
]


  const handleSearch = (event) => {
    const searchText = event.target.value;
    console.log(searchText)
   
    const matchedProducts = displayProducts.filter((expense) =>expense?.date?.includes(searchText));
    setDisplayProducts(matchedProducts);
  };

 
  let total = 0;
  for (const cost of displayProducts) {
    const unitCost = cost.usnitCost;
    const quantity = cost.quantity;
    const subTotal = parseInt(unitCost * quantity);
    total = total + subTotal;
  }

  return (
    <div className="mt-2">
      {/* <input
        type="text"
        onChange={handleSearch}
        placeholder="Search by Month"
        className="mb-2 input border-2 border-accent  w-full max-w-xs "
      /> */}

      <select  onChange={handleSearch} defaultValue={'DEFAULT'} className="select w-full max-w-xs">
        <option value='DEFAULT' disabled selected>
          Pick your Month
        </option>
        {
          months.map(m=><option value={m.name} key={m.id}>{m.name}</option>)
        }
      </select>

      <div className="overflow-x-auto">
        <table className="table w-full">
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
            {displayProducts.map((allExpense, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{allExpense.empoyeeName}</td>
                <td>{allExpense.date}</td>
                <td>{allExpense.itemName}</td>
                <td>{allExpense.specialNote}</td>
                <td>{allExpense.usnitCost}</td>
                <td>{allExpense.quantity} </td>
                <td>{allExpense.usnitCost * allExpense.quantity}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="6"></td>
              <td className="font-bold text-purple-500">Total Expense</td>
              <td className="font-bold text-purple-500">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificUserDataShow;
