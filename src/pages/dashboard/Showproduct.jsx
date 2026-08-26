import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/Showproduct.css'

const Showproduct = () => {
  
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const {data,setData,file,setFile,setPid,fetchData,deleteData,editData,productname,setProductName,price,setPrice,category,setCategory,stock,setStock,sethandleEdit}=useCart();
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
           console.log("delete");
           
       }
       
   }
  const handleEdit=async(id)=>{
    const rowdata=data.filter((i)=>i.id===id)
    console.log(rowdata);
    setProductName(rowdata[0].productname)
    setCategory(rowdata[0].category)
    setPrice(rowdata[0].price)
    setStock(rowdata[0].stock)
    // setFile(rowdata[0].image_url)
    setPid(id)
    navigate('/dashboard/addproduct')
    sethandleEdit(true);
    
    // setCategory(rowdata[])
    // console.log(rowdata[0].productname);
    // const error=await editData(id,productname,category,price,stock,url);
    // console.log(pname);
    
  }

  
  return (
   <div className="container py-4">
  {/* Header */}
  <div className="text-center mb-5">
    <h1 className="fw-bold display-5">Products</h1>
    <p className="text-muted">
      Manage your products, stock, and inventory
    </p>
  </div>

  {loading ? (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-3 text-muted">Loading products...</p>
    </div>
  ) : (
    <div className="row g-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <div className="card product-card h-100 border-0 shadow-sm">

            {/* Product Image */}
            <div className="product-image-wrapper">
              <img
                src={item.image_url}
                className="card-img-top product-image"
                alt={item.productname}
              />
            </div>

            {/* Card Body */}
            <div className="card-body d-flex flex-column">

              <h5 className="card-title fw-bold mb-2">
                {item.productname}
              </h5>

              <div className="d-flex justify-content-between align-items-center mb-3">

                <span className="fw-bold fs-5 text-primary">
                  ${item.price}
                </span>

                {item.stock > 0 ? (
                  <span className="badge bg-success-subtle text-success px-3 py-2">
                    In Stock
                  </span>
                ) : (
                  <span className="badge bg-danger-subtle text-danger px-3 py-2">
                    Out of Stock
                  </span>
                )}

              </div>

              <p className="text-muted small mb-3">
                Stock: <strong>{item.stock}</strong> units
              </p>

              {/* Buttons */}
              <div className="mt-auto d-flex gap-2">

                <button
                  onClick={() => handleDelete(item.id)}
                  type="button"
                  className="btn btn-outline-danger flex-grow-1"
                >
                  <FaTrash className="me-1" />
                  Delete
                </button>

                <button
                  onClick={() => handleEdit(item.id)}
                  type="button"
                  className="btn btn-outline-success flex-grow-1"
                >
                  <FaEdit className="me-1" />
                  Edit
                </button>

              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    
  )
}

export default Showproduct
