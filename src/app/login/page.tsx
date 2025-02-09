"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Signinside from "@/components/SignIn/SigninSide";
import Logininput from "@/components/SignIn/Input";
import '@/css/input1.css';
import '@/css/output1.css';


const SignIn = () => {
    return ( 
      <>
       <section className="login flex flex-wrap font-montserrat" style={{ height: "100vh" }}>
       <Logininput></Logininput>
       <Signinside></Signinside>
       </section>
      </>
     );
}
 
export default SignIn;