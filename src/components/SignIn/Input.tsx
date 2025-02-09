"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import axios from "axios";

const Logininput = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let st;
    // Reset error state and set loading to true
    setError("");
    setIsLoading(true);
    axios.post(process.env.API_URL + 'user/login', { email, password })
      .then(response => {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        st = localStorage.getItem('state')
        console.log(response.data.data.userType);
        console.log(st);
        // Handle routing based on userType
        if (response.data.data.userType === "ADMIN") {
          router.push("/superadmin/dashboard");
        } else if (response.data.data.userType === "FC") {
          router.push("/facilitycenter/dashboard");
        } else if (response.data.data.userType === "CC") {
          router.push("/collectioncenter/dashboard");
        } else if (response.data.data.userType === "CUSTOMER") {
          router.push("/booking");
        } else {
          setError("Invalid user type.");
        }
      })
      .catch(error => {
        // Handle errors here (e.g., invalid credentials or server error)
        setIsLoading(false);

        // If the error is a 401 Unauthorized (invalid credentials), display an appropriate message
        if (error.response && error.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          // Handle other types of errors
          setError("Invalid Credentials Please enter correct credentials");
        }

        console.error('Error fetching data:', error);
      });

    // Basic form validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="pt-4 pb-4 signinleft">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Client Logo"
          unoptimized
          width={320}
          height={200}
          id="logi"
          className="w-80 sm:w-40 md:w-48 lg:w-60 xl:w-80 pb-4 lg:pb-24 ml-7"
        />
      </Link>
      <h1 className="text-primary text-center font-semibold text-2xl lg:text-4xl xl:text-6xl pb-2 lg:pb-6 leading-none" style={{ fontSize: "48px", lineHeight: "normal" }}>
        Login to Your Account
      </h1>
      <p className="text-secondary text-xl lg:text-4xl text-center pb-8" style={{ fontSize: "30px", lineHeight: "normal" }}>
        Login via Social Networks
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-20">
        <li>
          <Link href="#">
            <Image
              src="/images/IKON-Facebook.png"
              unoptimized
              alt="Facebook Login"
              width={50}
              height={50}
            />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Image
              src="/images/IKON-GooglePlus.png"
              alt="Google Plus Login"
              unoptimized
              width={50}
              height={50}
            />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Image
              src="/images/IKON-Linkedin.png"
              alt="LinkedIn Login"
              unoptimized
              width={50}
              height={50}
            />
          </Link>
        </li>
      </ul>
      <div className="flex items-center mt-6" id="hror">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-4/5 mx-auto">
          <input
            type="text"
            name="email"
            id="bginput_mob"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            id="bginput_mob"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4  border-none"
            placeholder="Password"
          />
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="text-center pt-10 mb-15">
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded uppercase bg-secondary text-white py-1.5 px-12 font-extrabold text-24 hover:bg-[#1B5651] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 0116 0" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Logininput;
