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
    <div className='text-center'>
      <h1>Signup</h1>
      <input type="text"
      placeholder='enter your name'
      // value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <br />
      <input type="email"
      placeholder='enter your email'
      // value={email}
      onChange={(e)=>setEmail(e.target.value)}
       /> <br />
      <input type="password"
      placeholder='enter your password'
      // value={password}
      onChange={(e)=>setPassword(e.target.value)}
       /> <br />

       <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup
