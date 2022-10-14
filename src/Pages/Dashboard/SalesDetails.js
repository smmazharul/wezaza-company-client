import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SalesDetails = () => {
    const [salesDetails,setSalesDetails]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/sales')
        .then(res=>res.json())
        .then(data=>setSalesDetails(data))
    },[])

    let total=0;
    let subtotal;
    for(const sales of salesDetails ){
        const unitPrice =parseFloat(sales.cropsUnitPrice)
        const weight =parseFloat(sales.cropsWeight)
        subtotal=unitPrice*weight;
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
    <th>Crops Name</th>
    <th>Weight</th>
    <th>Unit price</th>
    <th>Subtotal</th>
   
  </tr>
</thead>
<tbody>
  {
    salesDetails.map((sales,index)=>(
        <tr>
    <th>{index + 1 }</th>
    <td>{sales.empoyeeName}</td>
    <td>{sales.date}</td>
    <td>{sales.cropsName}</td>
    <td>{sales.cropsWeight}</td>
    <td>{sales.cropsUnitPrice}</td>
    <td>{subtotal}</td>
    {/* <td>{depo.quantity} </td> */}
    
    
  </tr>

    ))
  }
  <tr>
    <td colspan="5"></td>
    <td className='font-bold text-purple-500' >My Sales</td>
    <td className='font-bold text-purple-500' >{total}</td>
  </tr>

  
</tbody>
</table>
</div>
    </div>
    );
};

export default SalesDetails;