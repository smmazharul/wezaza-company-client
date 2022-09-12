import React from 'react';
import { Link,  } from 'react-router-dom';
import { CurrencyBangladeshiIcon } from '@heroicons/react/24/solid'
import { FaMoneyBillAlt } from 'react-icons/fa';
const SpecificUser = ({ user,index ,handledata}) => {
    const { email } = user;
    return (
        
            <tr >
            <th className='text-secondary'>{index + 1}</th>
            <td >{email}</td>
            {/* <td><button onClick={()=>handledata(id)}>View</button></td> */}
            <td><Link to={`/dashboard/userDataShow/${email}`}><button className="btn btn-xs" onClick={()=>handledata(email)}><CurrencyBangladeshiIcon className="h-6 w-6 text-blue-500"/></button></Link></td>
            
            <td><Link to={`/dashboard/userDataShow/${email}`}><button className="btn btn-xs" onClick={()=>handledata(email)}><FaMoneyBillAlt className="h-6 w-6 text-primary"/></button></Link></td>
        </tr>

        
        
        
    );
};

export default SpecificUser;