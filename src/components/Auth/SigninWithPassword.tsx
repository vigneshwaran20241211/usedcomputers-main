"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import axios from "axios";

export default function SigninWithPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Reset error state and set loading to true
    setError("");
    setIsLoading(true);
    axios.post(process.env.API_URL+'user/login', { email, password })
    .then(response => {
      localStorage.setItem('accessToken',response.data.data.accessToken);
      console.log(response.data.data.userType);
      // Handle routing based on userType
      if (response.data.data.userType === "ADMIN") {
        router.push("/superadmin/dashboard");
      } else if (response.data.data.userType === "FC") {
        router.push("/facilitycenter/dashboard");
      } else if (response.data.data.userType === "CC") {
        router.push("/collectioncenter/dashboard");
      }else if (response.data.data.userType === "CUSTOMER") {
        router.push("/booking");
      } else {
        setError("Invalid user type.");
      }
    })
    // .catch(error => {
    //   setIsLoading(false);
    //   console.error('Error fetching data:', error);
    // });
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="mb-2.5 block font-medium text-dark dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="mb-2.5 block font-medium text-dark dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      {/* <div className="relative">
        <select name="userType" onChange={(e) => setUserType(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <option>--Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="FC">Facility Center</option>
          <option value="CC">Collection Center</option>
        </select>
      </div> */}
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between gap-2 py-2">
        <label
          htmlFor="remember"
          className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
        >
          <input type="checkbox" name="remember" id="remember" className="peer sr-only" />
          <span
            className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5"
          >
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Remember me
        </label>

        <Link
          href="/auth/forgot-password"
          className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${isLoading ? 'bg-gray-400' : 'bg-primary'} font-bold`}
          style={{ background: "#52a447" }}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
      <div className="mt-6 text-center">
            <p>
              Don’t have any account?{" "}
              <Link href="/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
    </form>
    
  );
};