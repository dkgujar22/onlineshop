import React from 'react';
import { Outlet } from 'react-router';
import DashSidebar from '../../components/DashSidebar';
import '../../css/DashboardRoot.css';

const Dashboardroot = () => {
  return (
    <div className="dashboard-root-layout">
      {/* Fixed Sidebar Wrapper */}
      <aside className="dashboard-sidebar-wrapper">
        <DashSidebar />
      </aside>

      {/* Dynamic Route Content Area */}
      <main className="dashboard-main-content">
        <div className="dashboard-content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboardroot;