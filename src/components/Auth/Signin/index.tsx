"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninSide from "../SigninSide";

export default function Signin() {
  return (
    <>
    <div className="flex flex-wrap items-center">
        <GoogleSigninButton text="Sign in" />
        <SigninSide></SigninSide>
    </div>
    </>
  );
}
