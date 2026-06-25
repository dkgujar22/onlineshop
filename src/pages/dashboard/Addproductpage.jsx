import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext';

const Addproductpage = () => {
  // const [productname,setProductName]=useState('')
  // const [category,setCategory]=useState('');
  // const [price,setPrice]=useState('');
  // const [stock,setStock]=useState(0);
  // const [url,setUrl]=useState('');


  
  const {pId,editData,addData,productname,category,price,stock,url,setProductName,setCategory,setPrice,setStock,setUrl,handleEdit,sethandleEdit}=useCart()
  
  const handleAddproduct=async()=>{
      const error=await addData();
      if(error){
        alert(error.message)
      }
      else{
        alert("Data Added successfully")
      setProductName('')
      setCategory('')
      setPrice('')
      setStock('')
      setUrl('')
      }

  }
  const handleUpdate=async()=>{
     const error=await editData(pId,productname,category,price,stock,url);
    if(error){
      alert(error.message)
    }else{
      alert("row updated successfully")
      setProductName('')
      setCategory('')
      setPrice('')
      setStock('')
      setUrl('')
      sethandleEdit(false)

    }
    console.log(pId,productname,category,price,stock,url);
    
       
  }
  
  return (
    <div className='text-center mt-5'>
      <input type="text"
      placeholder='Enter Product name'
      value={productname}
      onChange={(e)=>setProductName(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="text"
      placeholder='Enter category'
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      className='p-2 mb-1 set-input-width'/>
      <br />
      <input type="text"
      placeholder='Enter Price'
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="number"
      placeholder='enter stock'
      value={stock}
      onChange={(e)=>setStock(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      <input type="url"
      placeholder='enter product image'
      value={url}
      onChange={(e)=>setUrl(e.target.value)}
      className='p-2 mb-1 set-input-width' />
      <br />
      {handleEdit?<button onClick={handleUpdate}>Edit product</button>:
      <button onClick={handleAddproduct}>Add product</button>}

      
    </div>
  )
}

export default Addproductpage
