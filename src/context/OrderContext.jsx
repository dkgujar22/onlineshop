import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const OrderContext=createContext();

export const OrderProvider=({children})=>{
    const [orders,setOrders]=useState(null);
    const getOrders=async()=>{
            const {data:ordersdata,error}=await supabase.from('orders').select('*').order("created_at",{ascending:false});
            setOrders(ordersdata);
         
            
    
        }
        useEffect(() => {
        getOrders();
        }, []);

    return(
        <OrderContext.Provider value={{orders,setOrders,getOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder=()=>useContext(OrderContext);