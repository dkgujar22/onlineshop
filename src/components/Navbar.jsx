import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useCust } from "../context/CustomerAuthContext";
import { supabase } from "../supabaseClient";

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
        {/* Brand Logo */}
        <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
          My Shop
        </NavLink>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className={`navbar-toggle ${isMobileOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMobileOpen ? "is-active" : ""}`}>
          <ul className="navbar-links">
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
          </ul>

          {/* Cart Icon & Badge */}
          <div className="navbar-cart-wrapper">
            <NavLink className="cart-link" to="/cart" onClick={closeMenu}>
              <FaCartShopping className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </div>
          {
            cust? <button className="btn btn-danger" onClick={logout}>Logout</button>:
            <> 
              <span>
                <button className="btn btn-primary" onClick={()=>navigate('/signin')}>Login</button>
                user:
              </span>
            </>
            
            
          }
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;