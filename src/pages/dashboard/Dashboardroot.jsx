import React from 'react'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router'
import DashSidebar from '../../components/DashSidebar'

const Dashboardroot = () => {
  return (
    <div>
      {/* <Dashboard />
      <Outlet /> */}
      <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-3 bg-dark min-vh-100 p-0">
          <DashSidebar />
        </div>
        <div className="col-lg-10 col-md-9 p-4">
          <Outlet />
        </div>

      </div>
    </div>
    </div>
  )
}

export default Dashboardroot
