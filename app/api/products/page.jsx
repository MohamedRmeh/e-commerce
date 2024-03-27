/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products`)
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err));
  }, [products]);

  return (
    <div className="p-10">
      <div>
        <p className="text-4xl flex justify-center lg:justify-start lg:text-4xl text-neutral-800 font-semibold">
          All Product 
        </p>
      </div>
      <div className="flex flex-wrap gap-6 mt-10 justify-center">
        {products.allProduct &&
          products.allProduct.map((product) => {
            return (
              <div key={product._id}>
                <Link key={product._id} href={`/api/product/${product._id}`}>
                  <Image
                    className="bg-slate-50 p-5 rounded-lg shadow-lg hover:shadow-2xl transition delay-90"
                    src={`/images/${product.img}`}
                    width={230}
                    height={230}
                    alt="hero-image"
                  />
                </Link>
                <div className="flex flex-col gap-2 mt-2">
                  <h1 className="">{product.name}</h1>
                  <p className="font-bold">${product.price}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
