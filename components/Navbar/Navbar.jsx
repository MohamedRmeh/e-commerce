"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/index";
import Button from "../Button";
import { LoginContext } from "@/context/LoginContext";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Menu";
export default function Navbar() {
  const { isLoggedIn, handleLogout, isAdmin } = useContext(LoginContext);

  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData();
    }
  }, [userCart, isLoggedIn]);

  const fetchCartData = () => {
    axios
      .get(`http://localhost:3001/api/cart`, { withCredentials: true })
      .then((response) => setUserCart(response?.data?.cart))
      .catch((err) => console.log("User Not Found"));
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-neutral-800">
      <h3 className="font-normal text-xl text-white">MOX STORE</h3>

      <ul className="hidden lg:flex h-full gap-10 text-white">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="hover:text-slate-300 transition delay-90 hover:-translate-x-1"
          >
            {link.label}
          </Link>
        ))}
        <Link href={`/api/cart`}>Cart ( {userCart.length} )</Link>
        {isAdmin && (
          <Link
            className="hover:text-slate-300 transition delay-90 hover:-translate-x-1"
            href="/admin"
          >
            Admin
          </Link>
        )}
      </ul>

      {isLoggedIn ? (
        <div className="text-white hidden lg:flex gap-5">
          <Button onclick={handleLogout} href="/" title="Logout" />
        </div>
      ) : (
        <div className="text-white hidden lg:flex gap-5">
          <Button href="/api/auth/login" title="Sign in" />
          <Button href="/api/auth/register" title="Sign up" />
        </div>
      )}
      <Menu />
    </nav>
  );
}
