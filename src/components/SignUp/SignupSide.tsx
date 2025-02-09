"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SigninSide = () => {
    return ( 
      <div className="bg-gradient-to-r p-4 md:p-8 lg:p-16 signinright" style={{ background: "linear-gradient(198.17deg, #1B1E56 9.75%, #003456 49.05%, #5CA845 110.17%)" }}>
      <Image
        src="/images/driver.png"
        unoptimized
        alt="driver"
        className="w-80 mx-auto"
        width={320}
        height={320} // Adjust dimensions as needed
      />
      <h2 className="font-semibold text-white pt-4 lg:pt-16" style={{ fontSize: "48px",lineHeight: "normal" }}>
      Already have an account?
      </h2>
      <h4 className="text-light-gray pb-5 text-base" style={{ fontSize: "30px", lineHeight: "normal" }}
      >
        Login and discover the benefits of our Carbon Credit.
      </h4>
      <h6 className="text-secondary pb-4 lg:pb-14 text-base" style={{ fontSize: "26px", lineHeight: "normal" }}>
        For you and our planet.
      </h6>
      <Link href="/login"><button className="rounded uppercase bg-secondary text-white py-1.5 px-12 font-extrabold text-24 hover:bg-[#1B5651]">
        Login
      </button></Link>
    </div>
     );
}
 
export default SigninSide;