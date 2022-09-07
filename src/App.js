
import './App.css';
import Navbar from './Shared/Navbar';
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Expense from './Pages/Expense/Expense';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyExpenselist from './Pages/Dashboard/MyExpenselist';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AllUserExpense from './Pages/Dashboard/AllUserExpense';
import FilterExpenses from './Pages/Dashboard/SpecificUserData';
import SpecificUserData from './Pages/Dashboard/SpecificUserData';
import SpecificUserDataShow from './Pages/Dashboard/SpecificUserDataShow';
import DepositedFrom from './Pages/Dashboard/DepositedFrom';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/expense' element={<RequireAuth>
          <Expense/>
        </RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<MyExpenselist/>}></Route>
          <Route path='depositme' element={<DepositedFrom/>}></Route>
          <Route path='users' element={<RequireAdmin><Users/></RequireAdmin>}></Route>
          <Route path='expenseall' element={<AllUserExpense/>}></Route>
          <Route path='specificuser' element={<SpecificUserData/>}></Route>
          
        </Route>
        <Route path='userDataShow/:email' element={<SpecificUserDataShow/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
