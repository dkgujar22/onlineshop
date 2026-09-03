import React, { useEffect} from 'react'
import { useCart } from '../../context/CartContext';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toast';

const Addproductpage = () => {

  const {editData,addData,product,handleEdit,sethandleEdit}=useCart()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const image = data.image[0];
    if (handleEdit) {
      handleUpdate(data);
      // toast.warning("data updated successfully")
      reset();
    } else {
      addData(data.productname,data.category,data.price,data.stock,image);
      toast.success("data added")
    }

    reset();
  };
  useEffect(() => {
  if (product) {
    console.log(product);
    
    reset({
      productname: product[0].productname,
      category: product[0].category,
      price: product[0].price,
      stock: product[0].stock,
      image:product[0].image_url
    });
  }
}, [product, reset]);

  const handleUpdate=async(data)=>{
     const error=await editData(data.productname,data.category,data.price,data.stock);
    if(error){
      toast.error(error.message)
    }else{
      // alert("row updated successfully")
      toast.success("Data updated successfully")
      reset()
      sethandleEdit(false)

    }
  }
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              {/* Heading */}
              <div className="text-center mb-4">
                <h2 className="fw-bold">
                  {handleEdit ? "Edit Product" : "Add Product"}
                </h2>

                <p className="text-muted mb-0">
                  {handleEdit
                    ? "Update your product information"
                    : "Add a new product to your store"}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.productname ? "is-invalid" : ""
                    }`}
                    placeholder="Enter product name"
                    {...register("productname", {
                      required: "Product name is required",
                    })}
                  />

                  {errors.productname && (
                    <div className="invalid-feedback">
                      {errors.productname.message}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    placeholder="Enter category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />

                  {errors.category && (
                    <div className="invalid-feedback">
                      {errors.category.message}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Price
                  </label>

                  <div className="input-group">
                    <span className="input-group-text">$</span>

                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      placeholder="Enter price"
                      {...register("price", {
                        required: "Price is required",
                        min: {
                          value: 0,
                          message: "Price cannot be negative",
                        },
                      })}
                    />
                  </div>

                  {errors.price && (
                    <div className="text-danger small mt-1">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                {/* Stock */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    className={`form-control ${
                      errors.stock ? "is-invalid" : ""
                    }`}
                    placeholder="Enter stock quantity"
                    {...register("stock", {
                      required: "Stock is required",
                      min: {
                        value: 0,
                        message: "Stock cannot be negative",
                      },
                    })}
                  />

                  {errors.stock && (
                    <div className="invalid-feedback">
                      {errors.stock.message}
                    </div>
                  )}
                </div>

                {/* Product Image */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Product Image
                  </label>

                  <input
                    type="file"
                    className={`form-control ${
                      errors.image ? "is-invalid" : ""
                    }`}
                    accept="image/*"
                    {...register("image", {
                      required: handleEdit
                        ? false
                        : "Product image is required",
                    })}
                  />

                  {errors.image && (
                    <div className="invalid-feedback">
                      {errors.image.message}
                    </div>
                  )}

                  <div className="form-text">
                    Upload JPG, PNG or WEBP image.
                  </div>
                </div>

                {/* Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-semibold"
                  >
                    {handleEdit ? "Update Product" : "Add Product"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer/>
    </div>
 




  )
}

export default Addproductpage
