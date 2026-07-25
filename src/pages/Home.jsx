import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'


const Home = () => {
  const {data,setData,fetchData,cart,setCart,quantity}=useCart();
  const handleData=async()=>{
      const getdata=await fetchData();
      // console.log(getdata);
      setData(getdata)
      
    }
  useEffect(()=>{   
    handleData()
  },[])
  const handleCart=(id)=>{
    const cartData=data.filter((item)=>item.id===id);
    console.log(cartData);
    setCart((prev)=>[...prev,{
      ...cartData[0],quantity:quantity
    }])
    console.log(cart);
    
    
    
  }
  return (
    <div>
      
      <div className='text-center '>
        <h1>welcome to my shop</h1>
        <div className="row">
          {data.map((item)=>(
            <div key={item.id} className="col-12 col-sm-12 col-md-4">
               <div className='container' key={item.id} >
            <img src={item.image_url} alt="" style={{width:"250px",height:"300px"}} />
            <h3>{item.productname}</h3>
            <p>{item.category} </p>
            <p>{item.price} | {item.stock}</p>
            <button onClick={()=>handleCart(item.id)}>Add to cart</button>
          </div>

            </div>
         
        ))}
          
        </div>
        

      {/* <Outlet /> */}
      </div>

      <button onClick={()=>console.log(data)
      }>show data</button>
      
    </div>
  )
}

export default Home
