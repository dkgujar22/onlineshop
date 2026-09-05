import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import '../css/Home.css';
import '../css/Header.css'

const Home = () => {
  const { data, setData, fetchData, setCart, quantity } = useCart();
  const [search,setSearch]=useState('');
  const [category,setCategory]=useState('all');

  useEffect(() => {
    const handleData = async () => {
      const getdata = await fetchData();
      //  console.log(getdata);
      if (getdata) setData(getdata);
    };
    handleData();
   
    
    
  }, []);
  const uniqueCategories = [
  ...new Set(
    data.map((product) => product.category?.trim().toLowerCase())
  ),
];

const filteredProducts=data.filter((p)=>{
    
  const matchesSearch =
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.productname?.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "all" || p.category === category;

  return matchesSearch && matchesCategory;
     

 

                  
})

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
    
<header className="bg-light py-4 border-bottom">
  <div className="container">

    <div className="row align-items-center g-3">

      {/* Heading */}
      <div className="col-12 col-md-4">
        <h2 className="mb-1 fw-bold">Our Products</h2>
        <p className="text-muted mb-0">
          Find your favorite products
        </p>
      </div>

      {/* Search */}
      <div className="col-12 col-md-5">
        <div className="input-group">
          <span className="input-group-text bg-white">
            🔍
          </span>

          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div className="col-12 col-md-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>

          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

    </div>

  </div>
</header>





      {/* Main Product Showcase */}
      <main className="products-section">
        <div className="products-grid">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
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