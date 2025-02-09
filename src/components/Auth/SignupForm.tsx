"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignupForm() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    userType: "",
    address: "-",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle boolean checkbox values
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setData(value=>({
    //   ...value 
    //   ,'address' : '-'
    // }));
    console.log(data);
    setError(""); // Clear any previous error messages

    if (data.password !== data.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://apidev.usedcomputer.com.my:3001/user/register",
        data
      );
      alert("Register done go to register email");
      toast.success("Registration successful! Please check your mail activate account with in an hour!!", { position: "top-right" });
      router.push("/login");
      console.log(response);

      setData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirm_password: "",
        userType: "",
        address: "-",
        remember: false,
      })

    } catch (error) {
      console.error("Error submitting form:", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Name
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={data.name}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Phone No
        </label>
        <div className="relative flex items-center">
          <select className="w-auto rounded-l-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <option>+60</option>
          </select>
          <input
            type="text"
            placeholder="Enter Phone No"
            name="mobile"
            onChange={handleChange}
            value={data.mobile}
            className="w-full rounded-r-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={data.email}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={data.password}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="confirm_password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
            onChange={handleChange}
            value={data.confirm_password}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirm_password"
            className="mb-2.5 block font-medium text-dark dark:text-white"
          >
            User Type
          </label>
          <div className="relative">
            {/* <input
            type="text"
            name="userType"
            placeholder="Confirm your password"
            onChange={handleChange}
            value={data.userType}
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          /> */}
            <select name="userType" onChange={handleChange} value={data.userType} className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white">
              <option>--Select User Type</option>
              <option value="CUSTOMER">Customer</option>
              <option value="FC">Facility Center</option>
              <option value="CC">Collection Center</option>
            </select>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg"
      >
        Sign Up
      </button>
      <ToastContainer />
    </form>
  );
}
