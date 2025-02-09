"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Signin from "@/components/Auth/Signin/index";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn: React.FC = () => {
  useEffect(() => {
    console.log(sessionStorage.getItem('verifystatus'))
    if (sessionStorage.getItem('verifystatus') == 'Success') {
      toast.success(
        "Registration successful! Please check your mail activate account with in an hour!!",
        { position: "top-right" },
      );
    } else if (sessionStorage.getItem('verifystatus') == 'Error') {
      toast.error(
        "Token Expired",
        { position: "top-right" },
      );
    }
  }, []);
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <ToastContainer />
      <Signin />
    </div>
  );
};

export default SignIn;
