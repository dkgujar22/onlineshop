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
      {/* Hamburger Button - only visible when sidebar is closed, mobile only */}
      {!isSidebarOpen && (
        <button
          className="btn btn-outline-primary d-md-none position-fixed"
          style={{ top: '12px', left: '12px', zIndex: 1060 }}
          onClick={toggleSidebar}
        >
          <FiMenu size={22} />
        </button>
      )}

      {/* Mobile Overlay - light dim, click outside to close */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
          style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.15)' }}
          onClick={closeSidebar}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block position-fixed top-0 start-0"
        style={{ width: '260px', height: '100vh' }}
      >
        <DashSidebar closeMobileMenu={closeSidebar} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className="d-md-none position-fixed top-0 start-0 bg-white shadow"
        style={{
          width: '260px',
          height: '100vh',
          zIndex: 1050,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto'
        }}
      >
        {/* Close Button - inside the sidebar's own top-right corner */}
        <button
          className="btn btn-sm btn-light position-absolute"
          style={{ top: '12px', right: '12px', zIndex: 1055 }}
          onClick={closeSidebar}
        >
          <FiX size={20} />
        </button>

        <DashSidebar closeMobileMenu={closeSidebar} />
      </div>

      {/* Main Content */}
      <main className="dashboard-main min-vh-100 ">
        <div className="container-fluid p-3 p-md-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboardroot;