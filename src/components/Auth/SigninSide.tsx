"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SigninSide = () => {
    return ( 

        <>
            <style jsx>{`
         .bg-gradient-to-r {
            background-image: linear-gradient(to right, var(--tw-gradient-stops));
          }
          .how-it-works ,.client-list{
            background: rgb(2,0,36);
            width:100%;
            float:right;
            height:800px;
            background: linear-gradient(140deg, rgba(2,0,36,1) 0%, rgba(0,52,86,1) 0%, rgba(92,168,69,1) 100%);
          }
        @media (min-width: 768px) {
           .bg-gradient-to-r {
            background-image: linear-gradient(to right, var(--tw-gradient-stops));
          }
          .how-it-works ,.client-list{
            background: rgb(2,0,36);
            width:100%;
            float:right;
            height:800px;
            background: linear-gradient(140deg, rgba(2,0,36,1) 0%, rgba(0,52,86,1) 0%, rgba(92,168,69,1) 100%);
          }
        }
      `}</style>
        <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
          <div
            className="how-it-works custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none"
          >
            <Link className="mb-10 inline-block" href="/">
              <Image
                className="mx-auto hidden dark:block"
                src={"/images/logo/edriver.png"}
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/edriver.png"}
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
            <h3
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3"
              style={{ color: "#fff" }}
            >
              New Here
            </h3>
            <h3
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3"
              style={{ color: "#fff" }}
            >
              Sign up and discover the benefits of our Carbon Credit.
              <br />
              For you and our planet.
            </h3>
            <Link href="/signup">
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                style={{ background: "#52a447" }}
              >
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
        </>
     );
}
 
export default SigninSide;