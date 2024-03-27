/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginContext } from "@/context/LoginContext";

export default function page() {
  const { isLoggedIn } = useContext(LoginContext);

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/auth/register", formData)
      .then((response) => {
        console.log(response);
        router.push("/api/auth/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Please change your username or email");
      });
  };

  return (
    <section className="max-w-[1440px] mx-auto p-10">
      <div className="flex flex-col items-center gap-5">
        <p className="text-2xl lg:text-3xl font-semibold my-7">Sign Up</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="p-3 bg-slate-100 border rounded-lg lg:w-[400px] w-[350px] outline-none"
            type="name"
            placeholder="username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            className="p-3 bg-slate-100 border rounded-lg outline-none"
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="p-3 bg-slate-100 border rounded-lg outline-none"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            required
          />
          <div>
            {errorMessage && (
              <p className="text-red-600 text-sm p-2">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-slate-700 w-full transition delay-65 text-white p-3 rounded-lg uppercase hover:opacity-95"
            >
              Sign Up
            </button>
          </div>
          <div>
            <p>
              Do You Have An Acount ?{" "}
              <Link className="text-blue-700" href="/api/auth/login">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
