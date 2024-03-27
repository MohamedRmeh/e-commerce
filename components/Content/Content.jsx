"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function BestSeller() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products`)
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err));
  }, [products]);

  return (
    <>
      <section className="mb-10">
        <div className="flex justify-center">
          <div className="">
            <h1 className="flex justify-center text-4xl lg:text-5xl font-bold text-neutral-800">
              Best Seller Products
            </h1>
            <p className="flex justify-center py-5 lg:text-lg text-neutral-700">
              speaker There are many variations passages
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          {products.bestSeller &&
            products.bestSeller.map((product) => {
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
      </section>

      <section>
        <div className="py-14 px-12">
          <h1 className="text-4xl flex justify-center lg:justify-start lg:text-4xl text-neutral-800 font-semibold">
            New Arrivals
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-10 justify-center lg:flex">
            {products.newArrivals &&
              products.newArrivals.map((product) => {
                return (
                  <div key={product._id}>
                    <Link
                      href={`/api/product/${product._id}`}
                      key={product._id}
                    >
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
      </section>

      <section>
        <div className="py-14 px-12 mb-10">
          <h1 className="text-4xl flex justify-center lg:justify-start lg:text-4xl text-neutral-800 font-semibold">
            For Gamers
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-10 justify-center lg:flex">
            {products.forGamers &&
              products.forGamers.map((product) => {
                return (
                  <div key={product._id}>
                    <Link
                      key={product._id}
                      href={`/api/product/${product._id}`}
                    >
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
      </section>
    </>
  );
}
