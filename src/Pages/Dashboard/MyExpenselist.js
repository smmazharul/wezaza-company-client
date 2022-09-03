import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const MyExpenselist = () => {
    const [expenselist,setEpenselist]=useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            fetch(`https://young-fortress-58661.herokuapp.com/expenselist?empoyeeEmail=${user.email}`, {
              method: 'GET',
              headers: {
                  'authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
          })
                // .then(res =>{
                //   if(res.status===401 || res.status===403){

                //   }
                //   return res.json()
                //   })
                // .then(data => setEpenselist(data));
                .then(res => {
                  console.log('res', res);
                  if (res.status === 401 || res.status === 403) {
                      signOut(auth);
                      localStorage.removeItem('accessToken');
                      navigate('/');
                  }
                  return res.json()
              })
              .then(data => {

                setEpenselist(data);
              });
        }
    }, [user])
    let total=0;
    for(const cost of expenselist ){
        const unitCost=cost.usnitCost;
        const quantity=cost.quantity;
        const subTotal=parseInt(unitCost * quantity)
        total=total+subTotal

    }
    return (
        <div className='mt-2'>
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
        expenselist.map((expense,index)=>(
            <tr>
        <th>{index + 1 }</th>
        <td>{expense.empoyeeName}</td>
        <td>{expense.date}</td>
        <td>{expense.itemName}</td>
        <td>{expense.specialNote}</td>
        <td>{expense.usnitCost}</td>
        <td>{expense.quantity} </td>
        <td>{expense.usnitCost * expense.quantity}</td>
        
      </tr>

        ))
      }
      <tr>
        <td colspan="6"></td>
        <td className='font-bold text-purple-500' >My Total Expense</td>
        <td className='font-bold text-purple-500' >{total}</td>
      </tr>
    
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyExpenselist;