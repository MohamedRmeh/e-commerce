/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { LoginContext } from "@/context/LoginContext";

export default function Page() {
  const [userCart, setUserCart] = useState([]);
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) fetchCartData();
  }, [isLoggedIn]);

  const fetchCartData = () => {
    axios
      .get(`http://localhost:3001/api/cart`, { withCredentials: true })
      .then((response) => setUserCart(response.data))
      .catch((err) => console.log(err));
  };

  const deleteProductFromCart = (productId) => {
    axios
      .delete(`http://localhost:3001/api/cart/${productId}`, {
        withCredentials: true,
      })
      .then(() => {
        // Refresh cart data after successful deletion
        fetchCartData();
        console.log("Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to delete product");
      });
  };

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col gap-5 p-20">
        <div className="flex mb-10 text-3xl lg:text-4xl font-semibold text-stone-800">
          <p>Your Cart</p>
        </div>
        {userCart.cart && userCart.cart.length > 0 ? (
          userCart.cart.map((product, index) => (
            <div key={index} className="flex flex-col lg:gap-0 gap-3 lg:flex-row justify-center items-center lg:mb-0 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-3 w-[800px]">
                <Image
                  className="bg-slate-50 p-5 rounded-lg shadow-xl"
                  src={`/images/${product.product.img}`}
                  width={120}
                  height={120}
                  alt="product-image"
                />
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <p className="font-semibold">{product.product.name}</p>
                  <p className="">Quantity: {product.quantity}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-5 items-center">
                <p className="font-semibold">
                  {product.product.price * product.quantity}$
                </p>
                <button
                  onClick={() => deleteProductFromCart(product.product._id)}
                >
                  <Image
                    src="/icons/icons8-delete-64.png"
                    width={30}
                    height={30}
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          
          <div>
            <p className="text-3xl font-semibold text-stone-800">
              Your cart is empty!
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 items-center">
        <p className="font-semibold">Total: {userCart.total}$</p>
        <button className="hover:bg-opacity-90 border-2 w-[150px] text-white bg-stone-600 p-2 transition delay-80">
          Checkout
        </button>
      </div>
    </div>
  );
}
