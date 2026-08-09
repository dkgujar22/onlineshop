import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import '../css/Home.css';

const Home = () => {
  const { data, setData, fetchData, setCart, quantity } = useCart();

  useEffect(() => {
    const handleData = async () => {
      const getdata = await fetchData();
      if (getdata) setData(getdata);
    };
    handleData();
  }, []);

  const handleCart = (id) => {
    const itemToAdd = data.find((item) => item.id === id);
    if (!itemToAdd) return;

    setCart((prevCart) => {
      // Check if item already exists in cart to prevent duplicates
      const existingItem = prevCart.find((item) => item.id === id);
      const addQty = quantity || 1;

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: addQty }];
    });
  };

  return (
    <div className="home-container">
      {/* Header / Hero Section */}
      <header className="hero-banner">
        <h1 className="hero-title">Welcome to My Shop</h1>
        <p className="hero-subtitle">
          Discover our curated collection of premium products
        </p>
      </header>

      {/* Main Product Showcase */}
      <main className="products-section">
        <div className="products-grid">
          {data && data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="product-card">
                <div className="card-image-container">
                  <img
                    src={item.image_url}
                    alt={item.productname}
                    className="product-image"
                  />
                  {item.category && (
                    <span className="category-badge">{item.category}</span>
                  )}
                </div>

                <div className="card-content">
                  <h3 className="product-title">{item.productname}</h3>

                  <div className="product-meta">
                    <span className="product-price">${item.price}</span>
                    <span
                      className={`stock-status ${
                        item.stock > 0 ? 'in-stock' : 'out-of-stock'
                      }`}
                    >
                      {item.stock > 0 ? 'in stock' : 'Out of stock'}
                    </span>
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={() => handleCart(item.id)}
                    disabled={item.stock <= 0}
                  >
                    {item.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="loading-state">
              <p>Loading products...</p>
            </div>
          )}
        </div>
      </main>

      {/* <Outlet /> */}
    </div>
  );
};

export default Home;