"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignupForm from "../SignupForm";

export default function Signup() {
  return (
    <>
 <div className="my-6 flex items-center justify-center" style={{ color: "#015B8E", marginTop: "-100px" }}>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3" style={{ color : "#015B8E"}}></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark" style={{ color : "#015B8E" , fontSize: "30px" }}>
          Signup | Registeration
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3" style={{ color : "#015B8E"}}></span>
      </div>

      <div>
        <SignupForm />
      </div>

      <div className="mt-6 text-center">
        <p>
          Do You have Account?{" "}
          <Link href="/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
