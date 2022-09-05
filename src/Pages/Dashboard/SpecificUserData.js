import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';

import SpecificUser from './SpecificUser';
const SpecificUserData = () => {
  const [userExpense,setUserExpense]=useState([])
  const [displayProducts, setDisplayProducts] = useState([]);


  const [user]=useAuthState(auth)
  const {email}=user


    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://young-fortress-58661.herokuapp.com/user', {
        method: 'GET',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    
    if (isLoading) {
        return <Loading></Loading>
    }



    const handledata=(email)=>{
      fetch(`http://localhost:5000/expenselist/expense?empoyeeEmail=${email}`)
      .then(res=>res.json())
      .then(data=>setUserExpense(data))
  }

  
  const handleSearch = event => {
    const searchText = event.target.value;
    const matchedProducts = user.filter(expense =>expense.email?.toLowerCase().includes(searchText.toLowerCase()) && ! expense.date?.toLowerCase().includes(searchText.toLowerCase()))
    setDisplayProducts(matchedProducts);
  }
    return (
        <div>
            <h2 className="text-2xl">All Users: {users.length}</h2>
            <input type="text" onChange={handleSearch}  placeholder="Search by Employee Name" className="mb-2 input   w-full max-w-xs "  />
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL.</th>
                             <th>User Email</th>
                            
                            <th>View</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                       {
                           users.map((user,index)=><SpecificUser
                           key={user._id}
                           index={index}
                           user={user}
                           refetch={refetch}
                           userExpense={userExpense}
                           handledata={handledata}
                           
                           ></SpecificUser>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SpecificUserData;
