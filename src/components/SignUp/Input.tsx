"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import RegisterAutocomplete from "../Home/RegisterAutocomplete";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Logininput = () => {
  const { latLng } = useSelector((state: RootState) => state.register); // Get latLng from Redux store
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    userType: "",
    lat: "",
    lng: "",
    address: "-",
    location: [0, 0], // Default to [0, 0] for customers
  });
  const [error, setError] = useState("");

  // Update location based on latLng from Redux or user input
  useEffect(() => {
    if ((data.userType === 'CC' || data.userType === 'FC') && latLng.lat && latLng.lng) {
      setData((prev) => ({
        ...prev,
        location: [latLng.lng, latLng.lat], // Update location with latLng
      }));
    }
  }, [latLng, data.userType]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox for "remember me"
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!data.name || !data.lastname || !data.email || !data.mobile || !data.password || !data.confirm_password) {
      setError("All fields are required!");
      return;
    }

    // If the user type is CC or FC, check if latLng is available and set location correctly
    if (data.userType === 'CC' || data.userType === 'FC') {
      if (!latLng.lat || !latLng.lng) {
        setError("Please select a valid address!");
        return;
      }
    } else {
      // For customers, set the location as [0, 0]
      setData((prev) => ({
        ...prev,
        location: [0, 0],
      }));
    }

    // Reset error message
    setError("");

    // Check if passwords match
    if (data.password !== data.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10,11}$/; // Matches 10 or 11 digits
    if (!mobileRegex.test(data.mobile)) {
      setError("Mobile number must be 10 or 11 digits!");
      return;
    }

    // Prepare the payload with the correct location data
    const payload = {
      ...data,
      lat: latLng.lat || "",  // Use latLng from Redux or fallback to empty string
      lng: latLng.lng || "",  // Use latLng from Redux or fallback to empty string
      location: data.location,  // Use the location set earlier
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        "http://apidev.usedcomputer.com.my:3001/user/register",
        payload // Send the payload with location data
      );
      toast.success("Registration successful! Please check your email to activate your account within an hour!", { position: "top-right" });
      router.push("/login");

      // Reset the form after successful registration
      setData({
        name: "",
        lastname: "",
        mobile: "",
        email: "",
        password: "",
        address: "",
        userType: "",
        location: [0, 0], // Reset location to [0, 0] for customers
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

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
      <h1 className="text-primary text-center font-semibold text-2xl lg:text-4xl xl:text-6xl pb-2 lg:pb-6" style={{ fontSize: "48px", lineHeight: "normal" }}>
        Create a new account
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="w-4/5 mx-auto">
          <input
            type="text"
            name="name"
            id="bginput_mob"
            onChange={handleChange}
            value={data.name}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastname"
            id="bginput_mob"
            onChange={handleChange}
            value={data.lastname}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
            placeholder="Last Name"
          />
          <input
            type="email"
            id="bginput_mob"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
            placeholder="Email"
          />
          <div className="mb-4">
            <div className="relative flex items-center space-x-0">
              <select
                className="bg-light-gray py-2 px-4 mb-5 placeholder:text-info px-4 border border-stroke" id="bginput_mob1"
              >
                <option>+60</option>
              </select>
              <input
                type="text"
                maxLength={10}
                name="mobile"
                onChange={handleChange}
                value={data.mobile}
                className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border border-stroke" id="bginput_mob2"
                placeholder="Mobile Number"
              />
            </div>
          </div>
          <input
            type="password"
            name="password"
            id="bginput_mob"
            onChange={handleChange}
            value={data.password}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm_password"
            id="bginput_mob"
            placeholder="Confirm your password"
            onChange={handleChange}
            value={data.confirm_password}
            className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
          />
          <select name="userType" onChange={handleChange} value={data.userType} className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none" id="bginput_mob">
            <option>--Select User Type</option>
            <option value="CUSTOMER">Customer</option>
            <option value="FC">Facility Center</option>
            <option value="CC">Collection Center</option>
          </select>
          {(data.userType === 'CC' || data.userType === 'FC') && <RegisterAutocomplete />}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="text-center pt-10 mb-15">
            <button type="submit" className="rounded uppercase bg-secondary text-white py-1.5 px-12 font-extrabold text-24 hover:bg-[#1B5651]">
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Logininput;
