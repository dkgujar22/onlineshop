import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
    const {cart,setCart}=useCart();
    const navigate=useNavigate();
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onTouched',
  });
  const [modal,setModal]=useState(true)
  

  const Totalamount=cart.reduce((sum,item)=>Number(item.price)*(item.quantity)+sum,0)

  const onSubmit = async (data) => {
    // console.log('Form Submitted Data:', data);
    // alert('Form submitted successfully!');
    const {data:{user}}=await supabase.auth.getUser();
    const {data:orderdetail,error:orderdetailError}=await supabase.from('orders').insert([{
        user_id:user.id,
        full_name:data.name,
        phone:data.phone,
        address:data.address,
        country:data.country,
        postal_code:data.postalCode,
        total_amount:Totalamount,
        status: "pending"
    }]).select().single()
    // if(orderdetailError){
    //     console.log(orderdetailError.message);
    // }
    // else{
    //   console.log(orderdetail);
      
    // }

    const orderitems=cart.map((item)=>({
        order_id:orderdetail.id,
        product_id: item.id,
        product_name: item.productname,
        product_image: item.image_url,
        price: item.price,
        quantity: item.quantity
    }))

    const {data:custorderitems,error:orderitemsError}=await supabase.from('order_items').insert(orderitems);
    // if(orderitemsError){
    //     console.log(orderitemsError.message);
        
    // }else{
    //     console.log(custorderitems);
    // }
        
    // }
    // else{
    //    console.log(orderdetail);
    // }
    setModal(false)
    setCart([]);
     toast.success("order book successfully");
     setTimeout(() => {
           navigate('/')
     }, 2000);
    


    
    reset();
  };
  // const handleOrder=()=>{
  //   // setCart([]);
  //   toast.success("order book successfully")
  //   alert("order book successfully")
  // }
  return (
    <>
    {
        modal && 
        <>
        {cart.length>0?
        <div className="form-card">
      <h2 className="form-title">Contact & Address Info</h2>


      <form onSubmit={handleSubmit(onSubmit)} className="form-body" noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Please enter a valid phone number',
              },
            })}
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>

        {/* Address Field */}
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Street Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="1234 Main St, Apt 4B"
            {...register('address', { required: 'Street address is required' })}
            className={`form-input ${errors.address ? 'input-error' : ''}`}
          />
          {errors.address && (
            <span className="error-message">{errors.address.message}</span>
          )}
        </div>

        {/* City & Postal Code Grid */}
        <div className="form-row">
          {/* City */}
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="San Francisco"
              {...register('country', { required: 'Country is required' })}
              className={`form-input ${errors.city ? 'input-error' : ''}`}
            />
            {errors.country && (
              <span className="error-message">{errors.country.message}</span>
            )}
          </div>

          {/* Postal Code */}
          <div className="form-group">
            <label htmlFor="postalCode" className="form-label">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="94103"
              {...register('postalCode', {
                required: 'Postal code is required',
                pattern: {
                  value: /^[0-9A-Za-z\s-]{3,10}$/,
                  message: 'Enter a valid postal code',
                },
              })}
              className={`form-input ${errors.postalCode ? 'input-error' : ''}`}
            />
            {errors.postalCode && (
              <span className="error-message">{errors.postalCode.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Save Address
        </button>
      </form>
    </div>  :
         <button onClick={()=>navigate('/')}>do shopping first</button>
        
      }
        </>
        
        
}
 <ToastContainer/>
 
    </>
       
  )
}

export default Checkout
