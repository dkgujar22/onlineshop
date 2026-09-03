import { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

 const CartContext=createContext();

 export const CartProvider=({children})=>{
    // const [productname,setProductName]=useState('')
    // const [category,setCategory]=useState('');
    // const [price,setPrice]=useState('');
    // const [stock,setStock]=useState('');
    // const [file,setFile]=useState(null);
    const [handleEdit,sethandleEdit]=useState(false)
    const [pId,setPid]=useState(0);
    const [data,setData]=useState([]);
    const [cart,setCart]=useState([])
    const [custorderitem,setCustorderitem]=useState(null);
    const [quantity,setQuantity]=useState(1);
    const [product,setProduct]=useState(null);

   const addData=async(productname,category,price,stock,file)=>{

    // if(!file){
    //   alert("please upload an image")
    //   return
    // }
    // console.log(file);
    
    const fileName=`${Date.now()}-${file.name}`

    const {error:uploadError}=await supabase.storage.from('productimages').upload(fileName,file,{
       contentType: file.type,
       upsert: false,
    });
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

  }
    
  
  const fetchData=async()=>{
    const {data,error}=await supabase.from("admin_table").select("*").order('id', { ascending: true })
    if(!error){
      setData(data)
      return data  
    }

  }

  const deleteData=async(id)=>{
    const {error}=await supabase.from('admin_table').delete().eq('id',id)
    return error
  }
  const editData=async(productname,category,price,stock,image_url)=>{
   const {data,error}=await supabase.from('admin_table').update({productname,category,price,stock,image_url}).eq('id',pId)
   console.log(data);
  return error
  }

  // handleCart
  const handleStock=async()=>{
    console.log(custorderitem);
     const {data:productslist,error}=await supabase.from("admin_table").select("*").order('id', { ascending: true })
    console.log(productslist);
    
    

    for(const cartItem of custorderitem){
      const product=productslist.find((p)=>p.id===cartItem.product_id)
      console.log(product);
      const {error}=await supabase.from('admin_table').update({
        stock:parseInt(product.stock)-parseInt(cartItem.quantity)
      }).eq("id", product.id);

      return error
    }
    
  }
  // handleStock()

  return(
    <CartContext.Provider value={{custorderitem,setCustorderitem,quantity,setQuantity,handleStock,cart,setCart,data,setData,setPid,pId,fetchData,addData,editData,deleteData,handleEdit,sethandleEdit,product,setProduct}}>
        {children}
    </CartContext.Provider>
  )

 }

 export const useCart=()=>useContext(CartContext)