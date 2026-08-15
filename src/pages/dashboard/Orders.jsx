
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';

const Orders = () => {

    const [orders,setOrders]=useState([]);
    const [orderItems,setOrderItems]=useState([])
    const [loading,setLoading]=useState(true);
    const [orderdetail,setOrderdetail]=useState(false);
    const [custorderitem,setCustorderitem]=useState(null);
    const getOrders=async()=>{
        const {data:ordersdata}=await supabase.from('orders').select();
        setOrders(ordersdata);
        // console.log(ordersdata);     

    }
    // get specific customer ordered items to see it orders(id)===orderid(order_items)
    const getOrderitems=async()=>{
        const {data:orderitems}=await supabase.from('order_items').select()
        setOrderItems(orderitems);
        // console.log(orderitems);
        setOrderdetail(true)
        

    }
    useEffect(()=>{
        getOrders();
        getOrderitems();
        setLoading(false)
        

    },[2])

    const getcustomeritems=(id)=>{
        const items=orderItems.filter((orditem)=>orditem.order_id===id)
        console.log(items);
        setCustorderitem(items);


        

    }
  return (
    <div>
        {!loading?<>
         <h1 className='text-center'>Total orders:{orders.length}</h1>

        <div className="row">
            <div className="col-12">
                {orders.map((order)=>(
                    <div key={order.id}>
                        {order.full_name} |  {order.address} 
                        <button onClick={()=>getcustomeritems(order.id)}>get item</button>
                        { 
                        orderdetail? 
                        <>
                        {
                        custorderitem?.length>0 && custorderitem?.map((item)=>(
                            <div key={item.id}>
                                name:{item.product_name} |
                                quantity:{item.quantity} | price:{item.price}


                            </div>
                        ))
                        // <button onClick={()=>setOrderdetail(false)}>close</button>
                    }
                        </>:"no items"
                         
                        
 
                              
                           }

                    </div>
                ))}
            </div>
        </div>

        </>:<h1>loading</h1>}
       
      
    </div>
  )
}

export default Orders
