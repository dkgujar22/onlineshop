import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, replace, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useCust } from "../context/CustomerAuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [islogin,setIslogin]=useState(false)
  const{login,googleLogin}=useCust();
  const [params] = useSearchParams();
 
   const navigate = useNavigate();
   const redirectTo = params.get("redirectTo") || "/checkout";

  const onSubmit = async (data) => {
    setIslogin(true)
    const error = await login(data.email,data.password);

    if (error) {
      toast.error(error.message)
    } else {
      
          setIslogin(false)
          // toast.success("Login successfully")
          navigate(redirectTo, { replace: true });
        
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {" "}
        <div className="card shadow p-4" style={{ width: "400px" }}>
          {" "}
          <h2 className="text-center mb-4">Login</h2>{" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Email */}{" "}
            <div className="mb-3">
              {" "}
              <label className="form-label">Email</label>{" "}
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />{" "}
              {errors.email && (
                <div className="invalid-feedback"> {errors.email.message} </div>
              )}{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div className="mb-3">
              {" "}
              <label className="form-label">Password</label>{" "}
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />{" "}
              {errors.password && (
                <div className="invalid-feedback">
                  {" "}
                  {errors.password.message}{" "}
                </div>
              )}{" "}
            </div>{" "}
            {/* Login Button */}{" "}
            <button type="submit" className="btn btn-primary w-100">
              {" "}
              {islogin?"signing in...":"login"}{" "}
            </button>{" "}
          </form>{" "}
          {/* Divider */}{" "}
          <div className="d-flex align-items-center my-3">
            {" "}
            <hr className="flex-grow-1" />{" "}
            <span className="mx-2 text-muted">OR</span>{" "}
            <hr className="flex-grow-1" />{" "}
          </div>{" "}
          {/* Google Login */}{" "}
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={googleLogin}
          >
            {" "}
            <i className="bi bi-google me-2"></i> Continue with Google{" "}
          </button>{" "}
          {/* Signup */}{" "}
          <p className="text-center mt-3 mb-0">
            {" "}
            Don't have an account?{" "}
            <NavLink to="/createaccount" className="text-decoration-none">
              {" "}
              Sign Up{" "}
            </NavLink>{" "}
          </p>{" "}
        </div>{" "}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserLogin;
