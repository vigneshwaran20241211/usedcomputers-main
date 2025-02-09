"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="logo flex items-center">
        <Link href="/"><Image
          unoptimized
          src="/images/logo.png"
          alt="Company Logo"
          width={192}
          height={48}
          className="w-48 lg:w-60 xl:w-96"
        /></Link>
        <Link href="/"><Image
          unoptimized
          src="/images/driver.png"
          alt="Driver"
          width={112}
          height={112}
          className="w-28 lg:w-36 xl:w-60 border-l-2"
        /></Link>
      </div>

      <div className="pl-3 flex-1">
        <p className="text-primary font-bold text-base lg:text-24">
          Your Journey to a <span className="text-secondary">Greener Planet</span> Begins Here.
        </p>
      </div>

      {/* User Profile Dropdown */}
      <div className="relative">
        {/* <button
          className="uppercase bg-secondary text-white py-1 lg:py-1.5 px-6 lg:px-12 font-extrabold text-20 lg:text-24 rounded"
          onClick={toggleDropdown}
        >
          Profile
        </button> */}
        <Image
          src="/images/user/user-03.png" // Replace with your profile image path
          alt="Profile Icon"
          id="#profile"
          width={40} // Adjust the width as needed
          height={40} // Adjust the height as needed
          className="cursor-pointer rounded-full float-right"
          onClick={toggleDropdown}
        />
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-white text-black shadow-lg rounded-lg" id="profile">
            <ul>
              <li>
                <Link
                  href="/customer_profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/change-password"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/quotationhistory"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                Quotation History
                </Link>
              </li>
			   <li>
			    <Link
                  href="/bookinghistory"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Booking History
                </Link>
              </li>
              <li>
                <Link
                  href="/Logout"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
