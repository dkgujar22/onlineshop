import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const OrderContext=createContext();

export const OrderProvider=({children})=>{
    const [orders,setOrders]=useState(null);
    const getOrders=async()=>{
            const {data:ordersdata,error}=await supabase.from('orders').select('*');
            setOrders(ordersdata);
            console.log(ordersdata);  
            console.log(error);
               
    
        }
        useEffect(() => {
        getOrders();
        }, []);

    return(
        <OrderContext.Provider value={{orders,setOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder=()=>useContext(OrderContext);