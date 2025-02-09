"use client";
import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Navbar';

const Footer = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
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
        try {
            const response = axios.post(
                `${process.env.API_URL}newsletter`,
                data
            );
            //alert("Register done go to register email");
            toast.success("News Letter has been subscribed!!", { position: "top-right" });
            router.push("/#banner");
            console.log(response);
            setData({
                email: "",
            })

        } catch (error) {
            console.error("Error submitting form:", error);
            setError("There was an error submitting the form. Please try again.");
        }
    };
  return (
    <>
    <ToastContainer />
    <footer className="text-white bg-primary-100 pt-5 lg:pt-20 px-5 lg:px-0" id="contactus">
        <div className="container mx-auto p-[40px]">
            <div className="flex flex-wrap">
               
                <div className="news-letter w-full lg:w-3/12 pr-4">
                    <Image src="/images/logo-white.png"   width={310}  // Define the width of the image
                     height={100} alt="Logo" className="h-auto max-w-full pb-4"/>
                    <p className="text-base pb-6">Begin your journey in contributing
                        towards a greener planet and our
                        future.</p>
                    <div className="subscribe pb-8 relative">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="email" id=""  onChange={handleChange}
                                        value={data.email} className=" w-full text-primary placeholder:text-gray-400 py-3.5 px-6 rounded focus:outline focus:outline-0 sm:text-sm/6" placeholder="Subscribe with us" required/>
                        <button type="submit" className="absolute right-3.5 top-2.5">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3125 0.847656C24.1094 0.378906 25.1406 1.03516 24.9531 1.97266L21.5781 22.2227C21.4844 22.9727 20.6875 23.3945 20.0312 23.1133L14.2188 20.6289L11.2188 24.2852C10.5625 25.082 9.25 24.6602 9.25 23.5352V19.7383L20.5 6.00391C20.7344 5.72266 20.3594 5.39453 20.125 5.62891L6.67188 17.4883L1.65625 15.3789C0.8125 15.0508 0.71875 13.832 1.5625 13.3633L23.3125 0.847656Z" fill="#5CA845"/>
    </svg>
  </button>
                            </form>
                    </div>
                    <div className="quote pb-3">
                       <Image src="/images/quote.svg" width={200}
                height={200} alt="quote" className="h-auto max-w-full" />
                    </div>
                </div>
                <div className="links w-full lg:w-2/4 flex flex-wrap">
                    <div className="lg:px-5 w-full lg:w-2/4 ">
                        <h6 className="font-extrabold text-secondary pb-4 lg:pb-6  lg:text-xl text-lg">About</h6>
                        <ul>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#" className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span> About Us</a>
                            </li>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>
                                    Carbon Credit</a>
                            </li>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>Event Bookings</a>
                            </li>
                            <li className="pb-3.5 pt-3">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>News</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-2/4 lg:px-7 ">
                        <h6 className="font-extrabold text-secondary pb-4 lg:pb-6  lg:text-xl text-lg">Quick Links</h6>
                        <ul>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>
                                    Lorem Ipsum</a>
                            </li>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>
                                    Lorem Ipsum</a>
                            </li>
                            <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>FAQ's</a>
                            </li>
                            <li className="pb-3.5 pt-3">
                                <a href="#"  className="flex items-center text-base">
                                    <span className=" pr-2.5"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" fill="white"/>
                                        </svg>
                                        </span>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="channel w-full lg:w-1/4">
                    <h6 className="font-extrabold text-secondary pb-4 lg:pb-6  lg:text-xl text-lg">Watch Our Channel</h6>
                    <div className="flex  py-7 pt-0 border-b-2 border-dotted border-secondary">
                        <div className="me-3">
                            <Image src="/images/watch-channel.jpeg" width={100} 
                height={100} alt="Channel" className="h-auto max-w-full rounded-md" />
                        </div>
                        <div className="">
                            <h6 className="lg:font-extrabold text-sm lg:text-base pb-3">Carbon Credit. The currency of the Future</h6>
                            <p className="text-sm text-white">Mar. 30, 2023</p>
                        </div>
                    </div>
                    <div className="flex  py-7">
                        <div className="me-3">
                            <Image src="/images/watch-channel.jpeg" width={100} 
                height={100} alt="Channel" className="h-auto max-w-full rounded-md" />
                        </div>
                        <div className="">
                            <h6 className="lg:font-extrabold text-sm lg:text-base pb-3">Carbon Credit. The currency of the Future</h6>
                            <p className="text-sm text-white">Mar. 30, 2023</p>
                        </div>
                    </div>
                </div>
                <div className="copyright py-5 border-t-2 border-info border-dotted w-full">
                    <ul className="font-medium flex-wrap flex text-center mx-auto justify-center text-sm lg:text-base">
                        <li className="px-1 lg:px-2">© 2024 Usedcomputer </li>
                        <li className="px-1 lg:px-2 border-s-2">All rights reserved</li>
                        <li className="px-1 lg:px-2 border-s-2">Designed<a href="#" className="text-secondary"> Developed By</a></li>
                        <li className="px-1 lg:px-2 border-s-2 ">Powered by <a href="https://plenitudeit.com.my/" target="blank" className="text-secondary"> PlenitudeIT</a></li>
                    </ul>
                </div>
            </div>
        </div>
     </footer>
    </>
  );
};
export default Footer;