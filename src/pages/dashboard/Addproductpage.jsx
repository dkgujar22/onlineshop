import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext';

const Addproductpage = () => {
  const [productname,setProductName]=useState('')
  const [category,setCategory]=useState('');
  const [price,setPrice]=useState('');
  const [stock,setStock]=useState(0);
  const [url,setUrl]=useState('');
  
  const {addData}=useCart()
  
  const handleAddproduct=async()=>{
      const error=await addData(productname,category,price,stock,url);
      if(error){
        alert(error.message)
      }
      else{
        alert("Data Added successfully")
      }

  }
  
  return (
    <div className='text-center mt-5'>
      <input type="text"
      placeholder='Enter Product name'
      onChange={(e)=>setProductName(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="text"
      placeholder='Enter category'
      onChange={(e)=>setCategory(e.target.value)}
      className='p-2 mb-1 set-input-width'/>
      <br />
      <input type="text"
      placeholder='Enter Price'
      onChange={(e)=>setPrice(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="number"
      placeholder='enter stock'
      onChange={(e)=>setStock(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="url"
      placeholder='enter product image'
      onChange={(e)=>setUrl(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <button onClick={handleAddproduct}>Add product</button>

      
    </div>
  )
}

export default Addproductpage
