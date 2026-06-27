import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink, replace, useNavigate, useSearchParams } from 'react-router';
import googleIcon from '../assets/icons/google-icon.png'

const Login = () => {
    const {email,setEmail,password,setPassword,login,googleLogin}=useAuth();
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
    <div className='shadow p-3 mb-5 bg-body rounded text-center d-block mx-auto p-2 mt-5 form-width'>
      <h1 className='mb-3 mt-3'>Login</h1>
      <input className='set-input-width p-2 mb-2' type="email"
      value={email}
      placeholder='Enter your email'
      onChange={(e)=>setEmail(e.target.value)}

       /> <br />
      <input className='set-input-width p-2 mb-2' type="password"
      placeholder='Enter your password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
       /> <br />
       {/* <button className='px-2 py-1 mb-2 btn-color set-input-width text-light border-0 ' onClick={handleLogin}>Login</button> <br /> */}
       <button type="button"  onClick={handleLogin} class="px-2 py-1 mb-2 set-input-width btn btn-primary">Login</button><br />
       <span className='mt-2 p-2'>Don't Have an account? <NavLink to="/signup" onClick={()=>navigate('/signup')}>signup</NavLink></span>  <br />
       <button className='px-2 py-1 mb-2 bg-transparent mt-1 set-input-width' onClick={googleLogin}><img className='g-icon-w me-2' src={googleIcon} alt="icon" />Continue with Google</button>
    </div>
  )
}

export default Login
