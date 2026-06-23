import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink, replace, useNavigate, useSearchParams } from 'react-router';

const Login = () => {
    const {email,setEmail,password,setPassword,login}=useAuth();
    const [params]=useSearchParams();
    const navigate=useNavigate();

    const redirectTo=params.get('redirectTo') || '/dashboard'

    const handleLogin=async()=>{
        const error=await login();
        if(error) alert (error.message)
        else{
          alert("login successfully")  
          setEmail('')
          setPassword('') 
          navigate(redirectTo,{replace:true});
        }
    }
  return (
    <div className='text-center p-2'>
      <h1>login</h1>
      <input type="email"
      value={email}
      placeholder='enter your email'
      onChange={(e)=>setEmail(e.target.value)}

       /> <br />
      <input type="password"
      placeholder='enter your password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
       /> <br />
       <button onClick={handleLogin}>login</button> <br />
       <span>Not Have an account? <NavLink to="/signup" onClick={()=>navigate('/signup')}>signup</NavLink></span>  <br />
       <button>continue with google</button>
    </div>
  )
}

export default Login
