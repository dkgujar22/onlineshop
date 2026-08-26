import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';
import DashSidebar from '../../components/DashSidebar';
import '../../App.css'

const Dashboardroot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Mobile Navbar */}
      <nav className="navbar navbar-light bg-white border-bottom shadow-sm d-md-none">
        <div className="container-fluid">

          <button
            className="btn btn-outline-primary"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <span className="navbar-brand fw-bold text-primary mb-0">
            Admin Dashboard
          </span>

        </div>
      </nav>


      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        ></div>
      )}


      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block position-fixed top-0 start-0"
        style={{
          width: '260px',
          height: '100vh',
          zIndex: 1030
        }}
      >
        <DashSidebar closeMobileMenu={closeSidebar} />
      </div>


      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="d-md-none position-fixed start-0 bg-white shadow"
          style={{
            top: '57px',
            width: '260px',
            height: 'calc(100vh - 57px)',
            zIndex: 1050
          }}
        >
          <DashSidebar closeMobileMenu={closeSidebar} />
        </div>
      )}


      {/* Main Content */}
      <main
         className="dashboard-main min-vh-100"
  style={{
    marginLeft: '260px'
  }}
      >
        <div className="container-fluid p-3 p-md-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default Dashboardroot;