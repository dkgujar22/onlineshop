import { useState } from 'react'

import './App.css'
// import  {createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import { AuthProvider, useAuth } from './context/AuthContext'
// import Dashboard from './pages/Dashboard'
// import Login from './pages/Login'
// import Signup from './pages/Signup';
// import Root from './pages/Root'
import Protectedroute from './pages/Protectedroute'
import Layout from './Layout'
import { CartProvider } from './context/CartContext'

function App() {
  // const {requieAuth}=useAuth()
  //  const router=createBrowserRouter([
  //    {
  //     path:"/", element:<Root />,
  //     children:[
  //       {index:true,element:<Home />},
  //       {path:'login',element:<Login/>},
  //       {path:'signup',element:<Signup/>},
  //       {path:'dashboard',element:<Dashboard/>,loader:requieAuth}
  //     ]
  //    }
  //  ]) 
  return (
    <>
    <AuthProvider>
      <CartProvider>
      {/* <RouterProvider router={router} /> */}
     <Layout/>
     </CartProvider>
    </AuthProvider>
  
    </>
  )
}

export default App
