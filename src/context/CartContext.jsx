import { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

 const CartContext=createContext();

 export const CartProvider=({children})=>{

    // const [data,setData]=useState([]);

   const addData=async(productname,category,price,stock,url)=>{
    const {error}=await supabase.from("admin_table").insert([{productname,category,price,stock,url}])
    // if(error){
    //   toast.error(error.message)
    // }
    // else{
    //   toast.success("Data Added")
    // }
    return error
  }
  const fetchData=async()=>{
    const {data,error}=await supabase.from("admin_table").select("*")
    if(!error){
      // setData(data)
      console.log(data);
      return data
      
      // console.log(data);
      
    }

  }

  const deleteData=async(id)=>{
    const {error}=await supabase.from('admin_table').delete().eq('id',id)
    return error

  }
  const editdata=async(id,productname,category,price,stock,url)=>{
   const {error}=await supabase.from('admin_table').update({productname,category,price,stock,url}).eq('id',id)
   return error
  }

  return(
    <CartContext.Provider value={{fetchData,addData,deleteData}}>
        {children}
    </CartContext.Provider>
  )

 }

 export const useCart=()=>useContext(CartContext)