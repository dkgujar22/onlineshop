import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {
    const {cart,handleStock,setCart,setQuantity}=useCart();
    // const [qunatity,setQuantity]=useState(1);
    const handleOrder=async()=>{
      await handleStock();
      setCart([]);
      alert("order delivered")
    }

    const handleIncrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity+1}:c));
    }
    const handleDecrement=(id)=>{
      setCart(cart.map((c)=>c.id===id?{...c,quantity:c.quantity-1}:c));
    }
  return (
    <div>
        {cart.map((c)=>(
            <div key={c.id}>
                <p>{c.productname}</p>
                <button onClick={()=>handleIncrement(c.id)}>+</button >{c.quantity}
                <button onClick={()=>handleDecrement(c.id)}>-</button>
            </div>
        ))}
       <button onClick={handleOrder}>order now</button>
       <button onClick={()=>console.log(cart)
       }>show cart</button>

    </div>
  )
}

export default Cart
