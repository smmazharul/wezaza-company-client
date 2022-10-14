import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const MyExpenselist = () => {
  const [expenselist, setEpenselist] = useState([]);
  const [depositMe, setDepositMe] = useState([]);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetch(
        `https://wezaza-company-server1.onrender.com/expenselist?empoyeeEmail=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        // .then(res =>{
        //   if(res.status===401 || res.status===403){

        //   }
        //   return res.json()
        //   })
        // .then(data => setEpenselist(data));
        .then((res) => {
          // console.log('res', res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setEpenselist(data);
        });
    }
  }, [user]);
  let total = 0;
  for (const cost of expenselist) {
    const unitCost = cost.usnitCost;
    const quantity = cost.quantity;
    const subTotal = parseInt(unitCost * quantity);
    total = total + subTotal;
  }

  useEffect(() => {
    if (user) {
      fetch(
        `https://wezaza-company-server1.onrender.com/depositamount?empoyeeEmail=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        // .then(res =>{
        //   if(res.status===401 || res.status===403){

        //   }
        //   return res.json()
        //   })
        // .then(data => setEpenselist(data));
        .then((res) => {
          // console.log('res', res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setDepositMe(data);
        });
    }
  }, [user]);
  let deptotal = 0;
  for (const cost of depositMe) {
    const subtotal = parseInt(cost.amount);
    deptotal = deptotal + subtotal;
  }

  const handleMyExpenseDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete");
    if (proceed) {
      console.log("deleting id", id);

      const url = `https://wezaza-company-server1.onrender.com/expenselist/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Successfully Delete`);
            const remainingUsers = expenselist.filter(
              (expense) => expense._id !== id
            );
            setEpenselist(remainingUsers);
          }
        });
    }
  };

  return (
    <div className="mt-2">
      <h1 className="flex flex-row-reverse text-secondary bg-accent text-2xl p-2 rounded-md mt-2">
        Present Balance : {deptotal - total} BDT
      </h1>

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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenselist.map((expense, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{expense.empoyeeName}</td>
                <td>{expense.date}</td>
                <td>{expense.itemName}</td>
                <td>{expense.specialNote}</td>
                <td>{expense.usnitCost}</td>
                <td>{expense.quantity} </td>
                <td>{expense.usnitCost * expense.quantity}</td>
                <td className="text-secondary">
                  <Link to={`/dashboard/myexpense/${expense._id}`}>
                    <FaEdit></FaEdit>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleMyExpenseDelete(expense._id)}>
                    <FaTrashAlt/>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colspan="6"></td>
              <td className="font-bold text-purple-500">My Total Expense</td>
              <td className="font-bold text-purple-500">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExpenselist;
