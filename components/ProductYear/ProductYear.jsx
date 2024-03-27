import React from "react";
import Image from "next/image";

export default function ProductYear() {
  return (
    <section className="max-w-[1000px] mx-auto mb-10 py-10 px-10 bg-red-600 lg:rounded-lg text-white">
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between lg:items-center relative">
        <div className="w-96 flex lg:flex-col gap-5">
          <p>20% off</p>
          <h1 className="font-bold text-4xl lg:text-6xl">
            FINE
            <br />
            SMILE
          </h1>
          <p>15 Nov to 7 dec</p>
        </div>
        <div className="lg:absolute lg:left-52 lg:-bottom-14 md:mx-40 lg:mx-0">
          <Image
            alt="headphone"
            width={370}
            height={370}
            src="/images/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
          />
        </div>
        <div className="lg:w-1/3 flex flex-wrap lg:flex-col gap-8 lg:gap-5">
          <p>Best Solo</p>
          <h1 className="font-bold  text-4xl lg:text-5xl">Summer Sale</h1>
          <p className="text-sm">
            company that is grown from 270 to 480 employees in the last 12
            month.
          </p>
          <div>
            <button className="flex w-fit items-center gap-1 border-2 bg-white text-red-600 font-semibold hover:bg-neutral-200 p-2 transition delay-80 rounded-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
