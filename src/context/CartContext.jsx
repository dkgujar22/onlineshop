import { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

 const CartContext=createContext();

 export const CartProvider=({children})=>{
    const [productname,setProductName]=useState('')
    const [category,setCategory]=useState('');
    const [price,setPrice]=useState('');
    const [stock,setStock]=useState('');
    const [file,setFile]=useState(null);
    const [handleEdit,sethandleEdit]=useState(false)
    const [pId,setPid]=useState(0);
    const [data,setData]=useState([]);
    const [cart,setCart]=useState([])
    const [quantity,setQuantity]=useState(1);

    // const [data,setData]=useState([]);

   const addData=async()=>{

    if(!file){
      alert("please upload an image")
      return
    }
    const fileName=`${Date.now()}-${file.name}`

    const {error:uploadError}=await supabase.storage.from('productimages').upload(fileName,file);
    if(uploadError){
      alert(uploadError.message)
      return
    }

    const {data:urlData}=await supabase.storage.from('productimages').getPublicUrl(fileName)
    const imageUrl=urlData.publicUrl


    const {error}=await supabase.from("admin_table").insert([{productname,category,price,stock,image_url:imageUrl}])
    if(error){
      alert(error.message)
      return error
    }
    else{
      setProductName('')
      setCategory('')
      setPrice('')
      setStock('')
      setFile(null)
      
    }
  }
    
  
  const fetchData=async()=>{
    const {data,error}=await supabase.from("admin_table").select("*").order('id', { ascending: true })
    if(!error){
      setData(data)
      console.log(data);
      return data
      // console.log(data);    
    }

  }

  const deleteData=async(id)=>{
    const {error}=await supabase.from('admin_table').delete().eq('id',id)
    return error
  }
  const editData=async(id,productname,category,price,stock,image_url)=>{
   const {data,error}=await supabase.from('admin_table').update({productname,category,price,stock,image_url}).eq('id',id)
   console.log(data);
  //  return error
  // return productname
  // alert(productname)
  return error
  }

  // handleCart
  const handleStock=async()=>{

    for(const cartItem of cart){
      const product=data.find((p)=>p.id===cartItem.id)
      console.log(product);
      const {error}=await supabase.from('admin_table').update({
        stock:parseInt(product.stock)-parseInt(cartItem.quantity)
      }).eq("id", product.id);

      // setData(data)
    }
    
  }
  // handleStock()

  return(
    <CartContext.Provider value={{quantity,setQuantity,handleStock,cart,setCart,data,setData,setPid,pId,fetchData,addData,editData,deleteData,productname,setProductName,category,setCategory,price,setPrice,stock,setStock,file,setFile,handleEdit,sethandleEdit}}>
        {children}
    </CartContext.Provider>
  )

 }

 export const useCart=()=>useContext(CartContext)