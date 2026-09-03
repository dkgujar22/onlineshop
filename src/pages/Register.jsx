
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useCust } from "../context/CustomerAuthContext";


const Register = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {signIn}=useCust();

  const onSubmit =async (data) => {
    const error=await signIn(data.email,data.password);

    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              className={`form-control ${
                errors.name ? "is-invalid" : ""
              }`}
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />

            {errors.name && (
              <div className="invalid-feedback">
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
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
              <div className="invalid-feedback">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <div className="invalid-feedback">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Retype Password</label>

            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Retype your password"
              {...register("confirmPassword", {
                required: "Please retype your password",
                validate: (value) =>
                  value === watch("password") ||
                  "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Create Account */}
          <button type="submit" className="btn btn-primary w-100">
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


