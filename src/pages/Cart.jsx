import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout';
import { HiH1 } from 'react-icons/hi2';
import { useNavigate } from 'react-router';


const Cart = () => {
    const {cart,setCart}=useCart();
    const navigate=useNavigate();
        

    const handleIncrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity+1}:c));
    }
    const handleDecrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity>0?c.quantity-1:0}:c));
    }
    const removeCartitem=(id)=>{
      setCart(cart.filter((i)=>i.id!==id));

    }
  return (
   <div className="container py-5">

  {cart.length > 0 ? (
    <>
      {/* Cart Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Shopping Cart</h2>
          <p className="text-muted mb-0">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-primary"
        >
          Continue Shopping
        </button>
      </div>

      {/* Cart Items */}
      <div className="row">
        <div className="col-lg-8">

          {cart.map((item) => (
            <div className="card border-0 shadow-sm mb-3" key={item.id}>
              <div className="card-body p-3">

                <div className="row align-items-center g-3">

                  {/* Product Image */}
                  <div className="col-4 col-md-2 text-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Product Name & Price */}
                  <div className="col-8 col-md-3">
                    <h6 className="fw-semibold mb-2">
                      {item.name}
                    </h6>

                    <p className="text-muted mb-0">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block mb-1">
                      Quantity
                    </small>

                    <div
                      className="input-group"
                      style={{ maxWidth: "130px" }}
                    >
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="btn btn-outline-secondary"
                      >
                        −
                      </button>

                      <input
                        type="text"
                        className="form-control text-center fw-semibold"
                        value={item.quantity}
                        readOnly
                      />

                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="btn btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-6 col-md-2">
                    <small className="text-muted d-block mb-1">
                      Subtotal
                    </small>

                    <strong className="fs-6">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </strong>
                  </div>

                  {/* Remove */}
                  <div className="col-12 col-md-2 text-md-end">
                    <button
                      onClick={() => removeCartitem(item.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Items
                </span>

                <span>
                  {cart.length}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Total Quantity
                </span>

                <span>
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>

                <strong className="fs-5">
                  $
                  {cart
                    .reduce(
                      (total, item) =>
                        total + Number(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                type="button"
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    /* Empty Cart */
    <div className="text-center py-5">

      <div className="mb-3">
        <h1 className="fw-bold">
          Your Cart is Empty
        </h1>

        <p className="text-muted">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="btn btn-primary px-4"
      >
        Continue Shopping
      </button>

    </div>
  )}

</div>
  )
}

export default Cart
