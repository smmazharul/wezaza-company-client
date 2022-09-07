import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
const DepostiListMe = () => {

    const [depositMe,setDepositMe]=useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            fetch(`https://young-fortress-58661.herokuapp.com/depositamount?empoyeeEmail=${user.email}`, {
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
                  // console.log('res', res);
                  if (res.status === 401 || res.status === 403) {
                      signOut(auth);
                      localStorage.removeItem('accessToken');
                      navigate('/');
                  }
                  return res.json()
              })
              .then(data => {

                setDepositMe(data);
              });
        }
    }, [user])
    let total=0;
    for(const cost of depositMe ){
        const subtotal =parseInt(cost.amount)
        total=total+subtotal

    }
    return (
        <div className='mt-6 w-full'>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Empoyee Name</th>
        <th>Date</th>
        <th>Depositor</th>
        <th>Receiver</th>
        <th>Deposited Amount</th>
       
      </tr>
    </thead>
    <tbody>
      {
        depositMe.map((depo,index)=>(
            <tr>
        <th>{index + 1 }</th>
        <td>{depo.empoyeeName}</td>
        <td>{depo.date}</td>
        <td>{depo.depositor}</td>
        <td>{depo.Receiver}</td>
        <td>{depo.amount}</td>
        {/* <td>{depo.quantity} </td> */}
        
        
      </tr>

        ))
      }
      <tr>
        <td colspan="4"></td>
        <td className='font-bold text-purple-500' >My Total Expense</td>
        <td className='font-bold text-purple-500' >{total}</td>
      </tr>
    
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default DepostiListMe;