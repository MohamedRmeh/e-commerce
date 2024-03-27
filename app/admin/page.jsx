/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AdminSubmit from "@/components/AdminSubmit";
import ProductList from "@/components/ProductList";
import { LoginContext } from "@/context/LoginContext";

import { useRouter } from "next/navigation";

export default function page() {
  const { isAdmin } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }, [isAdmin]);

  const [showForm, setShowForm] = useState(true);
  return (
    <div className="p-3 lg:flex">
      <div className="flex lg:flex-col gap-5">
        <button
          onClick={() => setShowForm("showForm")}
          className="cursor-pointer flex gap-2 text-sm items-center font-semibold text-blue-900 hover:bg-slate-300 transition delay-90 rounded-lg w-fit p-2"
        >
          <Image src="/icons/add.png" alt="add" width={25} height={25} /> Add
          product
        </button>

        <button
          onClick={() => setShowForm(false)}
          className="cursor-pointer flex gap-2 text-sm items-center font-semibold text-blue-900 hover:bg-slate-300 transition delay-90 rounded-lg w-fit  p-2"
        >
          <Image src="/icons/list.png" alt="add" width={25} height={25} />
          Product list
        </button>
      </div>
      <hr className="my-2 mx-2 lg:h-[530px] border border-slate-400" />

      {showForm ? <AdminSubmit /> : <ProductList />}
    </div>
  );
}
