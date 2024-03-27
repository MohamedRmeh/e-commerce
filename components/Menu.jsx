"use client";
import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "@/context/LoginContext";
import axios from "axios";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import Image from "next/image";

const Menu = () => {
  const { isLoggedIn, handleLogout, isAdmin } = useContext(LoginContext);

  const [showLinks, setShowLinks] = useState(false);

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
    <button
      className="inline-block cursor-pointer lg:hidden relative"
      onClick={() => setShowLinks(!showLinks)}
    >
      <Image src="/icons/menu.png" alt="menu" width={32} height={32} />

      {showLinks ? (
        <div className="flex flex-col gap-5 items-center absolute transition delay-100 w-[160px] rounded-lg right-[40%] p-10 bg-neutral-700 text-white z-50">
          {isLoggedIn ? (
            <>
              <Button onclick={handleLogout} href="/" title="Logout" />
              {isAdmin && <Link href="/admin">Admin</Link>}
            </>
          ) : (
            <>
              <Button href="/api/auth/login" title="Sign in" />
              <Button href="/api/auth/register" title="Sign up" />
            </>
          )}
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
        </div>
      ) : (
        <Image
          src="/icons/menu.png"
          alt="menu"
          width={30}
          height={30}
          className="hidden"
          priority
        />
      )}
    </button>
  );
};

export default Menu;
