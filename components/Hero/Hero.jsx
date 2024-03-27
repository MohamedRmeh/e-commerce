import React from "react";
import Image from "next/image";
import Button from "../Button";

export default function Hero() {
  return (
    <section className="py-14 px-10 bg-neutral-800 mb-20">
      <div className="text-white flex flex-col-reverse gap-10 lg:flex lg:flex-row items-center lg:justify-between">
        <div className="flex flex-col gap-5 lg:w-1/2 lg:gap-7">
          <h1 className="text-2xl lg:text-4xl">
            {" "}
            Shop now and enjoy a great shopping experience !
          </h1>
          <p className="text-sm lg:text-lg text-zinc-400">
            Welcome to our online store that offers you a diverse range of
            electronic products, including headphones, tablets, and laptops. We
            are committed to providing the best services and products to our
            valued customers. Browse our online store now and enjoy a great
            shopping experience ! 🛍️
          </p>
          <div className="flex gap-5">
            <Button title="Show More" href="/api/products" />
          </div>
        </div>
        <div>
          <Image
            src="/images/hero.svg"
            width={520}
            height={520}
            alt="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
