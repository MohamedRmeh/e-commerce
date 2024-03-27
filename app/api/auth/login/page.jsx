/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useContext, useEffect } from "react";
import { LoginContext } from "@/context/LoginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const { handleInput, handleSubmit, errorMessage, isLoggedIn } =
    useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  

  return (
    <section className="max-w-[1440px] mx-auto p-10">
      <div className="flex flex-col items-center gap-5">
        <p className="text-2xl lg:text-3xl font-semibold my-7">Sign In</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="p-3 bg-slate-100 border rounded-lg lg:w-[400px] w-[350px] outline-none"
            type="text"
            placeholder="username"
            onChange={handleInput}
            name="username"
          />
          <input
            className="p-3 bg-slate-100 border rounded-lg outline-none"
            type="password"
            placeholder="password"
            onChange={handleInput}
            name="password"
          />
          <div>
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-slate-700 w-full transition delay-65 text-white p-3 rounded-lg uppercase hover:opacity-95"
            >
              Sign In
            </button>
          </div>
          <div>
            <p>
              Dont Have An Acount ?{" "}
              <Link className="text-blue-700" href="/api/auth/register">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
