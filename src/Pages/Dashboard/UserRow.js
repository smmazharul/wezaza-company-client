import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch,index }) => {
    
    const { email, role } = user;
    const [userExpense,setUserExpense]=useState([])
    const makeAdmin = () => {
        fetch(`https://young-fortress-58661.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403){
                    toast.error('Failed to Make an admin');
                }
                return res.json()})
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }

  
    return (
        <>
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' ? <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button> : <h1 className='text-xl font-bold text-secondary'>Admin</h1>} </td>
            {/* <td><button onClick={()=>handledata(id)}>View</button></td> */}
            <td><button className="btn btn-xs">Remove User</button></td>
        </tr>

        
        
        </>
    );
};

export default UserRow;