import React from 'react';
import { Link,  } from 'react-router-dom';

const SpecificUser = ({ user,index ,handledata}) => {
    const { email } = user;
    return (
        
            <tr >
            <th className='text-secondary'>{index + 1}</th>
            <td >{email}</td>
            {/* <td><button onClick={()=>handledata(id)}>View</button></td> */}
            <Link to={`/userDataShow/${email}`}><button className="btn btn-xs" onClick={()=>handledata(email)}>View</button></Link>
        </tr>

        
        
        
    );
};

export default SpecificUser;