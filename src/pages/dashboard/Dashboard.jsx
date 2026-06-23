import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink, redirect } from 'react-router'
import Login from '../Login';
import Dashboardpage from './Addproductpage';

const Dashboard = () => {
  const {Logout}=useAuth();
  return (
    <div className='text-center'>
      {/* Dashbboard */}
      {/* <Dashboardpage /> */}
      <NavLink to='/dashboard'>Home</NavLink> <br />
      <NavLink to='/dashboard/addproduct'>Add Product</NavLink><br />
      <NavLink to='/dashboard/showproducts'>Show Products</NavLink><br />
      <button onClick={Logout}>Logout</button>


      {/* <h1>Welcome to dashboard</h1> */}

      
      
    </div>
  )
}

export default Dashboard
