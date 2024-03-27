"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { LoginContext } from "@/context/LoginContext";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }) {
  const { isLoggedIn, userId } = useContext(LoginContext);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/product/${params.id}`)
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/addtocart",
          { userId, product, quantity }
        );
        console.log("Product added to cart successfully:", response.data);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      router.push('/api/auth/login')
      console.log("User must be logged in to add products to cart");
    }
  };

  return (
    <section className="p-20">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="">
          {product.img && (
            <Image
              className="bg-slate-50 p-5 rounded-lg shadow-2xl transition delay-90"
              src={`/images/${product.img}`}
              width={330}
              height={330}
              alt="hero-image"
            />
          )}
        </div>
        <div className="lg:w-1/2 flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-sky-900">{product.name}</h1>
          <p className="font-semibold text-sky-900">Details:</p>
          <p className="text-sm text-slate-600">{product.desc}</p>
          <p className="font-bold text-xl">${product.price}</p>

          <div className="flex items-center mb-5">
            <div className="pr-5">
              <p className="font-semibold text-stone-800">Quantity:</p>
            </div>
            <button
              onClick={decreaseQuantity}
              className="text-red-500  text-2xl border border-slate-600 px-4"
            >
              -
            </button>
            <p className="border-t border-b border-slate-600 px-4 py-1">
              {quantity}
            </p>
            <button
              onClick={increaseQuantity}
              className="text-green-500 text-2xl border border-slate-600 px-4"
            >
              +
            </button>
          </div>

          <div className="flex gap-5">
            <button className="flex items-center gap-1 border hover:bg-opacity-45 border-slate-300 w-[150px] justify-center bg-white text-red-600 font-semibold p-2 transition delay-80">
              Buy now
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 hover:bg-opacity-90 border-2 w-[150px] justify-center text-white bg-red-600 p-2 transition delay-80"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
