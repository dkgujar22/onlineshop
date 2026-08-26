import React from 'react';
import { NavLink } from 'react-router';
import {
  FiHome,
  FiPlusSquare,
  FiBox,
  FiLogOut,
  FiUser,
  FiShoppingBag
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const DashSidebar = ({ closeMobileMenu }) => {
  const { Logout, user } = useAuth();

  const linkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded ${
      isActive
        ? 'active bg-primary text-white'
        : 'text-dark'
    }`;

  return (
    <aside  className="d-flex flex-column bg-white h-100 p-3">

      {/* Brand */}
      <div className="mb-4 pb-3 border-bottom">
        <NavLink
          to="/dashboard"
          className="text-decoration-none"
          onClick={closeMobileMenu}
        >
          <h4 className="fw-bold text-primary mb-0">
            Admin Dashboard
          </h4>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1">

        <p className="text-uppercase text-muted small fw-bold px-3 mb-2">
          Menu
        </p>

        <ul className="nav flex-column gap-2">

          <li className="nav-item">
            <NavLink
              to="/dashboard"
              end
              onClick={closeMobileMenu}
              className={linkClass}
            >
              <FiHome size={20} />
              <span>Home</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/dashboard/addproduct"
              onClick={closeMobileMenu}
              className={linkClass}
            >
              <FiPlusSquare size={20} />
              <span>Add Product</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/dashboard/showproducts"
              onClick={closeMobileMenu}
              className={linkClass}
            >
              <FiBox size={20} />
              <span>Show Products</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/dashboard/orders"
              onClick={closeMobileMenu}
              className={linkClass}
            >
              <FiShoppingBag size={20} />
              <span>Orders</span>
            </NavLink>
          </li>

        </ul>
      </nav>

      {/* User / Logout */}
      <div className="border-top pt-3">

        <div className="d-flex align-items-center gap-2 mb-3 px-2">

          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
               style={{ width: '40px', height: '40px' }}>
            <FiUser size={20} />
          </div>

          <div className="overflow-hidden">
            <small className="text-muted d-block">
              Logged in as
            </small>

            <span
              className="fw-semibold text-truncate d-block"
              title={user?.email}
            >
              {user?.email || 'User'}
            </span>
          </div>

        </div>

        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={Logout}
        >
          <FiLogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default DashSidebar;