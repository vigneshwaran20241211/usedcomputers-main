"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Signupside from "@/components/SignUp/SignupSide";
import Logininput from "@/components/SignUP/Input";
import '@/css/input1.css';
import '@/css/output1.css';


const SignIn = () => {
    return ( 
      <>
      <body className="font-montserrat">
      <section className="login flex flex-wrap">
       <Logininput style={{ backgroundColor: "#ffffff" }}></Logininput>
       <Signupside></Signupside>
       </section>
      </body>
      </>
     );
}
 
export default SignIn;