import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="lg:p-16 p-10 flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-center">
      <div className="lg:w-1/2 flex flex-col gap-8">
        <h1 className="text-lg font-semibold text-blue-900">About Agency</h1>
        <p className="lg:text-4xl text-xl font-semibold text-blue-900">
          Unlimited Electronics: Explore Our Online Store for the Latest Gadgets
          and Electronics at Unbeatable Prices!
        </p>
        <p className="text-neutral-800 text-sm lg:text-lg font-semibold">
          Discover an extensive selection of cutting-edge gadgets and
          electronics at our online store, where you find everything from
          smartphones and laptops to smart home devices and accessories. With
          unbeatable prices and top-notch customer service, shopping for
          electronics has never been easier or more enjoyable!
        </p>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-16 lg:items-center">
          <div className="">
            <p className="font-bold text-lg text-blue-900">10 K+</p>
            <p className="text-neutral-800">Year of experience</p>
          </div>
          <div>
            <p className="font-bold text-lg text-blue-900">234 K+</p>
            <p className="text-neutral-800">Pecpie reached</p>
          </div>
          <div>
            <p className="font-bold text-lg text-blue-900">5 K+</p>
            <p className="text-neutral-800">Services and plugins</p>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/icons/about.png"
          width={400}
          height={400}
          alt="about-image"
        />
      </div>
    </div>
  );
}
