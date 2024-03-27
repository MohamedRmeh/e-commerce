"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Form Data
  const [formData, setFormData] = useState({
    desc: "",
    name: "",
    price: "",
    page: "",
    img: "",
  });


  // Get Products
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products`)
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, [products]);




  // Show Data In Forms
  const handleProductClick = (product) => {
    // If Click On Product Have Background
    setSelectedProduct(product);
    setFormData({
      desc: product.desc,
      name: product.name,
      price: product.price,
      page: product.page,
      img: product.img,
    });
  };


  // Update New Data For Products
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("desc", formData.desc);
      formDataObj.append("price", formData.price);
      formDataObj.append("page", formData.page);
      // Update Img If can
      if (formData.img && formData.img instanceof File) {
        formDataObj.append("img", formData.img);
      }

      await axios.put(
        `http://localhost:3001/api/products/${selectedProduct._id}`,
        formDataObj
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  // Delete Product
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/products/${selectedProduct._id}`
      );
      // Delete Product In My Menu
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div
        className="mx-5 p-5"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <p className="text-blue-900 text-xl my-5">Products</p>
        <div className="flex flex-col gap-5">
          {products.allProduct &&
            products.allProduct.map((product) => (
              <div
                key={product._id}
                className={`flex gap-5 ${
                  selectedProduct && selectedProduct._id === product._id
                    ? "bg-blue-200"
                    : ""
                }`}
              >
                <button onClick={() => handleProductClick(product)}>
                  <p className="hover:bg-blue-200 p-2 rounded-sm">
                    {product.name}
                  </p>
                </button>
                <button onClick={handleDeleteProduct}>
                  <Image
                    src="/icons/icons8-delete-64.png"
                    alt="delete"
                    width={25}
                    height={30}
                  />
                </button>
              </div>
            ))}
        </div>
      </div>
      <hr className="my-2 mx-8 lg:h-[530px] border border-slate-400" />

      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3">
          <label>Product Description</label>
          <textarea
            className="p-3 bg-slate-100 rounded-lg lg:w-[700px] w-[350px] h-[100px] outline-none shadow-lg"
            type="text"
            placeholder="Type here"
            name="desc"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col lg:flex-row w-[700px] gap-5">
          <div className="flex flex-col gap-3">
            <label>Product Name</label>
            <input
              className="p-3 bg-slate-100 rounded-lg lg:w-[340px] w-[350px]  outline-none shadow-lg"
              type="text"
              placeholder="Type here"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label>Product Price</label>
            <input
              className="p-3 bg-slate-100 rounded-lg lg:w-[340px] w-[350px] outline-none shadow-lg"
              type="number"
              placeholder="Set the product price"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <label>The desired product display page</label>
          <select
            className="mt-2 bg-slate-100 w-full rounded-md py-3 pl-5 pr-3 outline-none shadow-lg"
            name="page"
            type="page"
            required
            value={formData.page}
            onChange={(e) => setFormData({ ...formData, page: e.target.value })}
          >
            <option>Choose...</option>
            <option value="forGamers">for gamers</option>
            <option value="newArrivals">New Arrivals</option>
            <option value="bestSeller">best Seller</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Default file input example</label>
          <input
            className=" p-2 mt-2 w-full rounded-md bg-slate-100 shadow-lg"
            type="file"
            name="img"
            onChange={(e) =>
              setFormData({ ...formData, img: e.target.files[0] })
            }
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-1 hover:bg-opacity-90 border-2 w-[150px] justify-center shadow-lg text-white bg-blue-600 p-2 transition delay-80 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
}
