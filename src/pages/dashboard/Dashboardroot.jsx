import React from 'react'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router'

const Dashboardroot = () => {
  return (
    <div>
      <Dashboard />
      <Outlet />
    </div>
  )
}

export default Dashboardroot
