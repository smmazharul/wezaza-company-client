import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import {Outlet,Link} from 'react-router-dom'
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
 const [user]=useAuthState(auth)
 const [admin]=useAdmin(user)
 

    return (
        <div className="drawer drawer-mobile">
  <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* <!-- Page content here --> */}
        <h1 className='text-3xl text-purple-300 font-bold'>Welcome to your Dashboard</h1>
    <Outlet></Outlet>
  
  </div> 
  <div className="drawer-side">
    <label for="dashboard-sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li className='text-secondary bg-accent rounded-md mt-2'><Link to='/dashboard'>My Expenses</Link></li>
      <li className='text-secondary bg-accent rounded-md mt-2'><Link to='/dashboard/depositme'>Deposit Me</Link></li>
      
       {admin && < >
       <li className='text-secondary bg-accent rounded-md mt-2'><Link to='/dashboard/users'>All Users</Link></li>
       <li className='text-secondary bg-accent rounded-md mt-2'><Link to='/dashboard/expenseall'>All Expense</Link></li>
       <li className='text-secondary bg-accent rounded-md mt-2'><Link to='/dashboard/specificuser'>User Expenses</Link></li>
       </>
        }
      
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;
