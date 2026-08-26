import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout';
import { HiH1 } from 'react-icons/hi2';
import { useNavigate } from 'react-router';

const Cart = () => {
    const {cart,handleStock,setCart,setQuantity}=useCart();
    // const [qunatity,setQuantity]=useState(1);
    const navigate=useNavigate();
    const handleOrder=async()=>{
      // await handleStock();
      // setCart([]);
      // alert("order delivered")

    }

    const handleIncrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity+1}:c));
    }
    const handleDecrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity-1}:c));
    }
    const removeCartitem=(id)=>{
      setCart(cart.filter((i)=>i.id!==id));

    }
  return (
    <div>
      {cart.length>0?
      <>
       <div className="row">
        <div className="col-12">
          {cart.map((item)=>(
            <div className="card mb-3 shadow-sm" key={item.id}>
              <div className="card-body">
                <div className="row align-items-center">

                  {/* Product Image */}
                  <div className="col-md-2" >
                    <img
                      src={item.image_url}
                      alt={item.productname}
                      className="img-fluid rounded"
                      style={{width:"150px",height:"150px"}}
                    />
                  </div>

                  {/* Product Name */}
                  <div className="col-md-3">
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">
                      {item.price}$
                    </small>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-3">
                    <div className="input-group">
                      <button onClick={()=>handleDecrement(item.id)} className="btn btn-outline-secondary">
                        -
                      </button>

                      <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />

                      <button onClick={()=>handleIncrement(item.id)} className="btn btn-outline-secondary">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-md-2 text-center">
                    <strong>
                      {(Number(item.price) * item.quantity).toFixed(2)}$
                    </strong>
                  </div>

                  {/* Remove */}
                  <div className="col-md-2 text-end">
                    <button onClick={()=>removeCartitem(item.id)} className="btn btn-outline-danger btn-sm">
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        
          
        </div>
      </div>

        
       <button onClick={()=>navigate('/checkout')}
       type="button" class="btn btn-primary" >
        order now
        </button>
       {/* <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Checkout/>
      </div>
      
    </div>
  </div>
</div> */}

       {/* <button onClick={()=>console.log(cart)
       }>show cart</button> */}
      </>
     :<>
     <h1>empty cart</h1>
     <button onClick={()=>navigate('/')}>continue shopping</button>
     </>}
      

    </div>
  )
}

export default Cart
