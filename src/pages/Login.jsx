import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {Login}=useAuth();
    const [params]=useSearchParams();
    const navigate=useNavigate();
    const [islogin,setIslogin]=useState(false);
          const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

    const redirectTo=params.get('redirectTo') || '/dashboard'

    const onSubmit=(data)=>{
       setIslogin(true)
      
      const error=Login(data.email,data.password);
      if(error){
        alert(error)
      }
      else{
        // alert("login successfully")
        console.log("Navigating...");
        setTimeout(() => {
           navigate(redirectTo,{replace:true})
        setIslogin(false)
        reset()
        }, 2000);
       
      }    
        
    
    }
       
       
  return (
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />

                {errors.email && (
                  <small className="text-danger">
                    {errors.email.message}
                  </small>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {islogin?"signing in ...":"Login"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
   
   
  )
}

export default Login
