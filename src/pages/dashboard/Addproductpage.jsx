import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext';

const Addproductpage = () => {
  // const [productname,setProductName]=useState('')
  // const [category,setCategory]=useState('');
  // const [price,setPrice]=useState('');
  // const [stock,setStock]=useState(0);
  // const [url,setUrl]=useState('');


  
  const {pId,editData,addData,productname,category,price,stock,file,setFile,setProductName,setCategory,setPrice,setStock,handleEdit,sethandleEdit}=useCart()
  
  // const handleAddproduct=async()=>{
  //     const error=await addData();
  //     if(error){
  //       alert(error.message)
  //     }
  //     else{
  //     alert("Data Added successfully")
  //     setProductName('')
  //     setCategory('')
  //     setPrice('')
  //     setStock('')
  //     setUrl('')
  //     }

  // }
  const handleUpdate=async()=>{
     const error=await editData(pId,productname,category,price,stock,file);
    if(error){
      alert(error.message)
    }else{
      alert("row updated successfully")
      setProductName('')
      setCategory('')
      setPrice('')
      setStock('')
      setFile(null)
      sethandleEdit(false)

    }
    console.log(pId,productname,category,price,stock,image_url);
    
       
  }
  
  return (
    <div className='text-center mt-3'>
      <h1>Add Product</h1>
      <input type="text"
      placeholder='Enter Product name'
      value={productname}
      onChange={(e)=>setProductName(e.target.value)}
      className='p-2 mb-1 w-50' />
      <br />
      <input type="text"
      placeholder='Enter category'
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      className='p-2 mb-1 w-50'/>
      <br />
      <input type="text"
      placeholder='Enter Price'
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      className='p-2 mb-1 w-50' />
      <br />
      <input type="number"
      placeholder='Enter stock'
      value={stock}
      onChange={(e)=>setStock(e.target.value)}
      className='p-2 mb-1 w-50' />
      <br />
      <input type="file"
      placeholder='Enter product image'
      onChange={(e)=>setFile(e.target.files[0])}
      className='p-2 mb-1 w-50' />
      <br />
      {/* {handleEdit?<button onClick={handleUpdate}>Edit product</button>:
      <button onClick={handleAddproduct}>Add product</button>} */}

      {handleEdit?<button type="button"  onClick={handleUpdate} class="mb-2 btn btn-primary">Edit Product</button>:
      <button type="button"  onClick={addData} class="mb-2 btn btn-primary">Add Product</button>
}

      
    </div>
  )
}

export default Addproductpage
