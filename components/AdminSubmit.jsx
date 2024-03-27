"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminSubmit() {
  const router = useRouter();

  const [post, setPost] = useState({
    name: "",
    desc: "",
    price: "",
    page: "",
    img: "",
  });

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleFileInput = (event) => {
    setPost({ ...post, img: event.target.files[0] });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("desc", post.desc);
    formData.append("price", post.price);
    formData.append("page", post.page);
    formData.append("img", post.img);

    axios
      .post("http://localhost:3001/admin", formData)
      .then((response) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mx-auto m-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label>Product Description</label>
          <textarea
            className="p-3 bg-slate-100 rounded-lg lg:w-[700px] w-[350px] h-[100px] outline-none shadow-lg"
            type="text"
            placeholder="Type here"
            name="desc"
            required
            onChange={handleChange}
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
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label>Product Price</label>
            <input
              className="p-3 bg-slate-100 rounded-lg lg:w-[340px] w-[350px] outline-none shadow-lg"
              type="number"
              placeholder="Set the product price"
              name="price"
              required
              onChange={handleChange}
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
            onChange={handleChange}
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
            required
            onChange={handleFileInput}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 hover:bg-opacity-90 border-2 w-[150px] justify-center shadow-lg text-white bg-blue-600 p-2 transition delay-80 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
}
