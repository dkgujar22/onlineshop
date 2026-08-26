import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Dashboard from './pages/dashboard/Dashboard'
import { useAuth } from './context/AuthContext'
import Productpage from './pages/dashboard/Showproduct'
import Dashboardhome from './pages/dashboard/Dashboardhome'
import Dashboardroot from './pages/dashboard/Dashboardroot'
import Addproductpage from './pages/dashboard/Addproductpage'
import Showproduct from './pages/dashboard/Showproduct'
import Cart from './pages/Cart'
import Orders from './pages/dashboard/Orders'
import Checkout from './pages/Checkout'

const Layout = () => {
    const {requireAuth}=useAuth();
    const router=createBrowserRouter([
        {
            path:'/',element:<Root />,
            children:[
                {index:true,element:<Home />},
                {path:'login',element:<Login />},
                {path:'signup',element:<Signup/>},
                {path:'cart',element:<Cart/>},
                {path:'checkout',element:<Checkout/>},
                {path:'dashboard',element:<Dashboardroot/>,loader:requireAuth,
                    children:[
                        {index:true,element:<Dashboardhome />},
                        {path:'addproduct',element:<Addproductpage />},
                        {path:'showproducts',element:<Showproduct />},
                        {path:'orders',element:<Orders/>},
                        
                    ]
                }

            ]
        }
    ])

  return (
    <>
    <RouterProvider router={router}  />
    </>
  )
    
}

export default Layout
