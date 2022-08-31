import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import {Outlet,Link} from 'react-router-dom'
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
 const [user]=useAuthState(auth)
 const [admin]=useAdmin(user)
 console.log(admin)
 console.log(user)
    return (
        <div class="drawer drawer-mobile">
  <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content ">
    {/* <!-- Page content here --> */}
        <h1 className='text-3xl text-purple-300 font-bold'>Welcome to your Dashboard</h1>
    <Outlet></Outlet>
  
  </div> 
  <div class="drawer-side">
    <label for="dashboard-sidebar" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><Link to='/dashboard'>My Expenses</Link></li>
      
       {admin &&  <li><Link to='/dashboard/users'>All Users</Link></li> }
          
        
      
      {/* <li><Link to='/dashboard/'>Sidebar Item 2</Link></li> */}
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;
