import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useCust } from "../context/CustomerAuthContext";
import { supabase } from "../supabaseClient";
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  const { cart } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {cust,logout}=useCust();
  const navigate=useNavigate();

 

  // Calculate total item quantity in cart
  const cartCount = cart
    ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
    : 0;

  const toggleMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileOpen(false);
  };

  return (
<nav className="navbar">
  <div className="navbar-container">

    {/* Logo */}
    <NavLink
      className="navbar-brand"
      to="/"
      onClick={closeMenu}
    >
      My Shop
    </NavLink>

   

    {/* Navigation Menu */}
    <div className={`navbar-menu ${isMobileOpen ? "is-active" : ""}`}>
      <ul className="navbar-links">

        {/* Home */}
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-item-link active" : "nav-item-link"
            }
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>

        {/* Dashboard */}
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-item-link active" : "nav-item-link"
            }
            to="/dashboard"
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>

        {/* Mobile Login / User / Logout */}
        <li className="mobile-auth">

          {cust ? (
            <div className="mobile-user-section">

              <div className="user-info">
                <FaUser className="user-icon" />
                <span>{cust.name || cust.email}</span>
              </div>

              <button
                className="btn btn-danger logout-btn"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/signin");
                closeMenu();
              }}
            >
              Login
            </button>
          )}

        </li>

      </ul>
    </div>

    {/* Right Side */}
    <div className="navbar-right">

      {/* Cart - Always visible */}
      <NavLink
        className="cart-link"
        to="/cart"
        onClick={closeMenu}
      >
        <FaCartShopping className="cart-icon" />

        {cartCount > 0 && (
          <span className="cart-badge">
            {cartCount}
          </span>
        )}
      </NavLink>

      {/* Desktop Login / User / Logout */}
      <div className="desktop-auth">

        {cust ? (
          <div className="desktop-user-section">

            <div className="user-info">
              <FaUser className="user-icon" />
              <span>{cust.name || cust.email}</span>
            </div>

            <button
              className="btn btn-danger logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        )}

      </div>

      {/* Hamburger */}
      <button
        className={`navbar-toggle ${
          isMobileOpen ? "open" : ""
        }`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

    </div>

  </div>

</nav>
  );
};

export default Navbar;