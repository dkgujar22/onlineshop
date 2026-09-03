import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/Showproduct.css'

const Showproduct = () => {
  
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const {data,setData,setProduct,setPid,fetchData,deleteData,sethandleEdit}=useCart();
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
  const handleEdit=(id)=>{
    const rowdata=data.filter((i)=>i.id===id)
    setProduct(rowdata)
    setPid(id)
    navigate('/dashboard/addproduct')
    sethandleEdit(true);
  }

  
  return (
  <div className="container py-4">

  {/* Header */}
  <div className="text-center mb-5">
    <h1 className="fw-bold display-5 mb-2">Products</h1>
    <p className="text-muted mb-0">
      Manage your products, stock, and inventory
    </p>
  </div>

  {loading ? (

    /* Loading */
    <div className="text-center py-5">
      <div
        className="spinner-border text-primary"
        role="status"
      ></div>
      <p className="mt-3 text-muted">
        Loading products...
      </p>
    </div>

  ) : (

    /* Products */
    <div className="row g-4">

      {data.map((item) => (

        <div
          key={item.id}
          className="col-12 col-sm-6 col-lg-4 col-xl-3"
        >

          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

            {/* Product Image */}
            <div
              className="bg-light d-flex align-items-center justify-content-center"
              style={{ height: "210px" }}
            >
              <img
                src={item.image_url}
                alt={item.productname}
                className="img-fluid"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  padding: "15px",
                }}
              />
            </div>

            {/* Card Body */}
            <div className="card-body d-flex flex-column p-3">

              <h5 className="fw-bold mb-3 text-truncate">
                {item.productname}
              </h5>

              {/* Price + Status */}
              <div className="d-flex justify-content-between align-items-center mb-3">

                <span className="fw-bold fs-5 text-primary">
                  ${item.price}
                </span>

                {item.stock > 0 ? (
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                    In Stock
                  </span>
                ) : (
                  <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
                    Out of Stock
                  </span>
                )}

              </div>

              {/* Stock */}
              <p className="text-muted small mb-4">
                Stock:{" "}
                <strong className="text-dark">
                  {item.stock}
                </strong>{" "}
                units
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
