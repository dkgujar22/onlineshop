import { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

 const CartContext=createContext();

 export const CartProvider=({children})=>{
    const [productname,setProductName]=useState('')
    const [category,setCategory]=useState('');
    const [price,setPrice]=useState('');
    const [stock,setStock]=useState('');
    const [url,setUrl]=useState('');
    const [handleEdit,sethandleEdit]=useState(false)
    const [pId,setPid]=useState(0);

    // const [data,setData]=useState([]);

   const addData=async()=>{
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
    const {data,error}=await supabase.from("admin_table").select("*").order('id', { ascending: true })
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
  const editData=async(id,productname,category,price,stock,url)=>{
   const {error}=await supabase.from('admin_table').update({productname,category,price,stock,url}).eq('id',id)
  //  console.log(productname);
  //  return error
  // return productname
  // alert(productname)
  return error
  }

  return(
    <CartContext.Provider value={{setPid,pId,fetchData,addData,editData,deleteData,productname,setProductName,category,setCategory,price,setPrice,stock,setStock,url,setUrl,handleEdit,sethandleEdit}}>
        {children}
    </CartContext.Provider>
  )

 }

 export const useCart=()=>useContext(CartContext)