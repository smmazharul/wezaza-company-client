import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import {Outlet} from 'react-router-dom'
import DepostiListMe from './DepostiListMe';
import { toast } from 'react-toastify';

const DepositedFrom = () => {
    const [depostAmount,setDepositAmount]=useState(null)
    const [date, setDate] = useState(new Date());
    const [user] = useAuthState(auth);

    const formattedDate=format(date,'PP')
    
const handleSubmitDepositme=e=>{
    e.preventDefault()
    const depositamountlist={
        date: formattedDate,
        empoyeeName: user.displayName,
        empoyeeEmail: user.email,
        depositor: e.target.depositor.value,
        Receiver: e.target.Receiver.value,
        amount: e.target.amount.value,
        
      }
  
      fetch('https://young-fortress-58661.herokuapp.com/depositamount', {
        method: "POST",
        headers: {
          'content-type':'application/json'
        },
        body:JSON.stringify(depositamountlist)
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data) {
                
            toast.success(`Successfully Submit`);
        }
          setDepositAmount(null)
        })
  
}
   
    return (
        <>
        <div  className="card lg:card-side bg-base-100 shadow-xl lg:flex-row-reverse w-[100%] justify-items-center items-center p-2">
        <div className="card-body w-[350px] lg:w-full">
        <DayPicker mode="single" selected={date} onSelect={setDate} className="w-[50%]"/>
      </div>
        <form onSubmit={handleSubmitDepositme}  className="grid grid-cols-1 gap-4 justify-items-center mt-2 w-full">
          <input
            type='text'
            value={format(date, "PP")}
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
            name="depositor"
            placeholder="depositor Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="Receiver"
            placeholder="Receiver Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            required
            name="amount"
            placeholder="Deposit amount"
            className="input input-bordered w-full max-w-xs"
          />
         
          <input
            type="submit"
            value="Submit"
            placeholder="Type here"
            className="btn btn-secondary w-full max-w-xs"
          />
        </form>

       
      </div>


<Outlet></Outlet>

<DepostiListMe></DepostiListMe>

        </>
    );
};

export default DepositedFrom;