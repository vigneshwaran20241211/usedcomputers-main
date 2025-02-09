"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SigninWithPassword from "@/components/Auth/SigninWithPassword";

export default function GoogleSigninButton({ text }: { text: string }) {
  return (
    <div className="w-full xl:w-1/2">
      <div className="w-full p-4 sm:p-12.5 xl:p-15">
    <div className="flex flex-col items-center p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Login to Your Account</h1>

      {/* Subheading */}
      <p className="text-lg text-green-600 mb-4">Login via Social Networks</p>

      {/* Social Icons */}
      <div className="flex space-x-4">
        <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-20">
          <li>
            <Link href="#">
              <Image src="/images/IKON-Facebook.png" height={50} width={50} alt="" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image src="/images/IKON-GooglePlus.png"  height={50} width={50} alt=""/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image src="/images/IKON-Linkedin.png"  height={50} width={50} alt=""/>
            </Link>
          </li>
        </ul>

      </div>

      {/* Divider with "OR" */}
      <div className="flex items-center mt-6 w-full">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
    </div>
      </div>
      <SigninWithPassword></SigninWithPassword>
          </div>

  );
}
