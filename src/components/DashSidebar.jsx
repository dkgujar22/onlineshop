import React from 'react';
import { NavLink } from 'react-router';
import { FiHome, FiPlusSquare, FiBox, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../css/Dashsidebar.css';

const DashSidebar = () => {
  const { Logout, user } = useAuth();

  return (
    <aside className="dash-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="sidebar-brand">
          <span className="brand-text">Admin Dashboard</span>
        </NavLink>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FiHome className="sidebar-icon" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addproduct"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FiPlusSquare className="sidebar-icon" />
              <span>Add Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/showproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FiBox className="sidebar-icon" />
              <span>Show Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FiBox className="sidebar-icon" />
              <span>Orders</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User Info & Logout Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <FiUser />
          </div>
          <span className="user-email" title={user?.email}>
            {user?.email || 'User'}
          </span>
        </div>
        <button className="logout-btn" onClick={Logout} title="Logout">
          <FiLogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashSidebar;