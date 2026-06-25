import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router';

const Showproduct = () => {
  const [data,setData]=useState([]);
  const navigate=useNavigate();
  const {setPid,fetchData,deleteData,editData,productname,setProductName,price,setPrice,category,setCategory,stock,setStock,url,setUrl,sethandleEdit}=useCart();
  const handledata=async()=>{
    const fetchdata=await fetchData();
    setData(fetchdata)
    
  }
  const handleEdit=async(id)=>{
    const rowdata=data.filter((i)=>i.id===id)
    // console.log(rowdata);
    setProductName(rowdata[0].productname)
    setPid(id)
    navigate('/dashboard/addproduct')
    sethandleEdit(true);
    
    // setCategory(rowdata[])
    // console.log(rowdata[0].productname);
    // const error=await editData(id,productname,category,price,stock,url);
    // console.log(pname);
    
  }

  
  return (
    <div className='text-center'>
      <button onClick={handledata}>get data</button>
      <button onClick={fetchData}>fetchdata</button>
      <h1>PRODUCTS</h1>
      {data.map((item)=>(
        <div key={item.id}>
          <h1>{item.productname}</h1>
          <button onClick={()=>deleteData(item.id)}>delete</button>
          <button onClick={()=>handleEdit(item.id)}>edit</button>
          {/* <button onClick={handleEdit}>move to add products</button> */}
        </div>
      ))}
    </div>
  )
}

export default Showproduct
