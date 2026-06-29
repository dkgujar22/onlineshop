import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
// import { FaTrash, FaTrashAlt } from 'react-icons/fa';

const Showproduct = () => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const {setPid,fetchData,deleteData,editData,productname,setProductName,price,setPrice,category,setCategory,stock,setStock,url,setUrl,sethandleEdit}=useCart();
  const handledata=async()=>{
    setLoading(true)
    const fetchdata=await fetchData();
    setTimeout(() => {
      setLoading(false)
    },1000);
    setData(fetchdata)
  }
  useEffect(()=>{
      handledata();
      
  },[])

   const handleDelete=async(id)=>{
       const error=await deleteData(id);
       if(!error){
           setData((prev)=>prev.filter((i)=>i.id!==id))
       }
       
   }
  const handleEdit=async(id)=>{
    const rowdata=data.filter((i)=>i.id===id)
    // console.log(rowdata);
    setProductName(rowdata[0].productname)
    setCategory(rowdata[0].category)
    setPrice(rowdata[0].price)
    setStock(rowdata[0].stock)
    setUrl(rowdata[0].url)
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
      {/* <button onClick={handledata}>get data</button> */}
      {/* <button onClick={fetchData}>fetchdata</button> */}
      <h1>Products</h1>
      {loading?<h1 className='mt-5'>loading...</h1>:
      // data.map((item)=>(
      //   <div key={item.id}>
      //     <h1>{item.productname}</h1>
      //     <button onClick={()=>deleteData(item.id)}>delete</button>
      //     <button onClick={()=>handleEdit(item.id)}>edit</button>
      //     {/* <button onClick={handleEdit}>move to add products</button> */}
      //   </div>
      // ))
      <div className='row g-3 justify-content-center'>
        
        {data.map((item)=>(
        <div key={item.id} className="col-12 col-12 col-sm-12 col-md-4 ">
          <div className='card card-height shadow p-3 mb-5 bg-body rounded'>
            <img src={item.url} className='card-img-top card-img-height' alt="" />
            <div className='card-body'>
               <h2 className='card-title'>{item.productname}</h2>
                  <span><span>{item.price}|{item.stock>0?<span  className='p-2'>Instock</span>:<span>out of stock</span>}</span></span>
                  {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
                  <br />
                  <button onClick={()=>handleDelete(item.id)} type="button" class="btn btn-warning mb-1 me-1"><FaTrash /></button>
                  <button onClick={()=>handleEdit(item.id)} type="button" class="btn btn-success mb-1"><FaEdit/></button>
            </div>
                 
          </div>        
        </div>
        ))}      
    </div>}
    </div>
    
  )
}

export default Showproduct
