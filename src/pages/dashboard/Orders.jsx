
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import '../../css/Order.css'
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Orders = () => {

    const {handleStock,custorderitem,setCustorderitem}=useCart();
    const {orders,setOrders,getOrders}=useOrder();
    const [orderItems,setOrderItems]=useState([])
    const [loading,setLoading]=useState(true);
    const [orderdetail,setOrderdetail]=useState(false);
    const [filterstatus,setFilterstatus]=useState('all');
    const [alterstatusid,setAlterstatusId]=useState(null);

    
    // get specific customer ordered items to see it orders(id)===orderid(order_items)

    const fetchOrders=async()=>{
      await getOrders();
    }
    const getOrderitems=async()=>{
        const {data:orderitems,error}=await supabase.from('order_items').select()
        setOrderItems(orderitems);
        setOrderdetail(true)
        

    }
    useEffect(()=>{
        getOrderitems();
        setLoading(false)
        

    },[])

    const handleGetItems=(id)=>{
        const items=orderItems.filter((orditem)=>orditem.order_id===id)
        setCustorderitem(items);
        setAlterstatusId(id);   


    }
    const filterorders=orders?.filter((order)=>{
        if(filterstatus==="delivered") return order.status==="delivered"
        if(filterstatus==="pending") return order.status==="pending"
        return order

    });
    const handleDispatch=async()=>{
        await handleStock();
        const {data:updatedOrder}=await supabase.from("orders").update({
            status:"delivered"
        }).eq('id',alterstatusid).select();
        
  
        const updateorderData=orders.map((ord)=>(
           ord.id===alterstatusid?{...ord,status:"delivered"}:ord
        ))
        setOrders(updateorderData)
        toast.success("Order Delivered Successfully")
        
        
    }
  return (
   
    <div className="orders-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">

  {/* Title */}
  <div>
    <h1 className="dashboard-title mb-1">Orders Management</h1>
    <p className="dashboard-subtitle mb-0">
      Track, review, and manage customer purchases
    </p>
  </div>

  {/* Right Side */}
  <div className="d-flex align-items-center gap-3">

    {/* Filter */}
    <div>
      <label className="form-label small fw-semibold mb-1">
        Filter Status
      </label>

      <select
        className="form-select form-select-sm"
        value={filterstatus}
        onChange={(e) => setFilterstatus(e.target.value)}
      >
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>

    {/* Total Orders */}
    <div className="total-badge text-center px-3 py-2">
      <span className="d-block small">Total Orders</span>
      <strong className="fs-5">{orders?.length || 0}</strong>
    </div>

  </div>
</header>

      {/* Orders Grid */}
      <div className="orders-grid">
        {filterorders?.map((order) => (
          <div key={order.id} className="order-card">
            <div className="card-header">
              <div className="order-id-group">
                <span className="order-label">ORDER</span>
                <span className="order-id">#{order.id ? order.id.slice(0, 8) : 'N/A'}</span>
              </div>
              <span className={`status-badge status-${order.status ? order.status.toLowerCase() : 'pending'}`}>
                {order.status || 'Pending'}
              </span>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Customer</span>
                <span className="info-value font-highlight">{order.full_name}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Phone</span>
                <span className="info-value">{order.phone}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Shipping</span>
                <span className="info-value truncate-text">
                  {order.address}, {order.city} ({order.postal_code})
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">Placed On</span>
                <span className="info-value text-muted">{order.created_at.split('T')[0]}</span>
              </div>
            </div>

            <div className="card-footer">
              <div className="total-price-group">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">${Number(order.total_amount || 0).toFixed(2)}</span>
              </div>

              {order.status==="delivered"?
              <button 
                type="button" 
                className="btn-get-items btn btn-primary" 
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => handleGetItems(order.id)}
                disabled
                
              >
                Get Items
              </button>:
               <button 
                type="button" 
                className="btn-get-items btn btn-primary" 
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => handleGetItems(order.id)}
                
              >
                Get Items
              </button>}

             

              {/* <!-- Modal --> */}
                    
            </div>
            
          </div>
        ))}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Order items</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-light">
  {custorderitem?.map((item) => (
    <div
      key={item.id}
      className="d-flex align-items-center bg-white border rounded-3 p-3 mb-3 shadow-sm"
    >
      {/* Product Image */}
      <img
        src={item.product_image}
        alt={item.product_name}
        className="rounded-3 border me-3"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
        }}
      />

      {/* Product Info */}
      <div className="flex-grow-1">
        <h6 className="fw-semibold mb-1">
          {item.product_name}
        </h6>

        <div className="text-muted small">
          Quantity: <span className="fw-semibold">{item.quantity}</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-end">
        <span className="text-muted small d-block">Price</span>
        <strong className="text-primary">
          ${item.price}
        </strong>
      </div>
    </div>
  ))}
</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleDispatch} type="button" class="btn btn-primary" data-bs-dismiss="modal">
                              dispatch</button>
                        </div>
                        </div>
                    </div>
                    </div>
      </div>

     <ToastContainer/>
    </div>
  )
}

export default Orders
