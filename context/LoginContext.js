"use client";
import jwt from "jsonwebtoken";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState();

  const addToCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.product.id === product.id);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/auth/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        const { data } = response;
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Incorrect password or username");
      });
  };

  useEffect(() => {
    setIsLoggedIn(!!cookies.token);
  }, [cookies]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    router.push("/");
  };

  useEffect(() => {
    setIsAdmin(cookies.token ? jwt.decode(cookies.token).isAdmin : false);
  }, [cookies.token]);

  useEffect(() => {
    setUserId(cookies.token ? jwt.decode(cookies.token).id : "");
  }, [cookies.token]);

  return (
    <LoginContext.Provider
      value={{
        userId,
        addToCart,
        isAdmin,
        handleLogout,
        isLoggedIn,
        errorMessage,
        handleSubmit,
        handleInput,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
