import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'

const Showproduct = () => {
  const [data,setData]=useState([]);
  const {fetchData,deleteData}=useCart();
  const handledata=async()=>{
    const fetchdata=await fetchData();
    setData(fetchdata)
    
  }
  const handleEdit=(id)=>{
    const rowdata=data.filter((i)=>i.id===id)
    console.log(rowdata);
    
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
        </div>
      ))}
    </div>
  )
}

export default Showproduct
