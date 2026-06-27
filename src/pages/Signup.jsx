import React from 'react'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const {name,setName,email,setEmail,password,setPassword,signUp}=useAuth();

  const handleSignup=async()=>{
    const error=await signUp();
    if(error){
      console.log(error.message);
      alert(error.message)
      console.log("Email:", `"${email}"`);
      console.log("Type:", typeof email);
    }
    else{
      alert("Account created successfully")
  }

  }
  return (
    <div className='shadow p-3 mb-5 bg-body rounded text-center d-block mx-auto p-2 mt-5 form-width'>
      <h1 className='mb-3'>Signup</h1>
      <input className='set-input-width p-2 mb-2' type="text"
      placeholder=' Enter your name'
      // value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <br />
      <input className='set-input-width p-2 mb-2' type="email"
      placeholder='Enter your email'
      // value={email}
      onChange={(e)=>setEmail(e.target.value)}
       /> <br />
      <input className='set-input-width p-2 mb-2' type="password"
      placeholder='Enter your password'
      // value={password}
      onChange={(e)=>setPassword(e.target.value)}
       /> <br />

       {/* <button className=' btn-color  text-light border-0 '>Signup</button> */}
       <button type="button"  onClick={handleSignup} class="px-2 py-1 mb-2 set-input-width btn btn-primary">Signup</button>
    </div>
  )
}

export default Signup
