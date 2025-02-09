"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(data);
        setError("");
        try {
            const response = axios.post(
                `${process.env.API_URL}contact?verify=12345`,
                data
            );
            toast.success("Contact form submitted, we will contact you soon!", { position: "top-right" });
            router.push("/#contactus");
            console.log(response);

            setData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })

        } catch (error) {
            console.error("Error submitting form:", error);
            setError("There was an error submitting the form. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="contactus">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-10">
                        {/* Contact Information Blocks */}
                        <div className="flex flex-col gap-6">
                            <div className="group w-full mx-auto">
                                <div className="bg-white rounded-lg p-6">
                                    <a href="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} className="text-center">
                                        <Image
                                            src="/images/phone.png"
                                            alt="phone"
                                            width={80}
                                            height={80}
                                        />
                                    </a>
                                    <p className="text-3xl font-bold text-center text-[#5CA845]">Call Us</p>
                                    <Link href="tel:+603 3122 2383" style={{ display: "block", margin: "auto", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", marginTop: "1rem", color: "#0A4154" }}>+603 3122 2383</Link>
                                </div>
                            </div>
                            <div className="group w-full">
                                <div className="bg-white rounded-lg p-6">
                                    <a href="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} className="text-center">
                                        <Image
                                            src="/images/whatsapp.png"
                                            alt="whatsapp"
                                            width={80}
                                            height={80}
                                        />
                                    </a>
                                    <p className="text-3xl font-bold text-center text-[#5CA845]">Whatsapp</p>
                                    <Link href="+601 9393 2383" style={{ display: "block", margin: "auto", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", marginTop: "1rem", color: "#0A4154" }}>+601 9393 2383</Link>
                                </div>
                            </div>
                            <div className="group w-full">
                                <div className="bg-white rounded-lg p-6">
                                    <a href="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} className="text-center">
                                        <Image
                                            src="/images/email.png"
                                            alt="email"
                                            width={80}
                                            height={80}
                                        />
                                    </a>
                                    <p className="text-3xl font-bold text-center text-[#5CA845]">Email</p>
                                    <Link href="mailto:info@usercomputer.com.my" style={{ display: "block", margin: "auto", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", marginTop: "1rem", color: "#0A4154" }}>info@usedcomputer.com.my</Link>
                                </div>
                            </div>
                            <div className="group w-full">
                                <div className="bg-white rounded-lg p-6">
                                    <a href="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} className="text-center">
                                        <Image
                                            src="/images/time.png"
                                            alt="time"
                                            width={80}
                                            height={80}
                                        />
                                    </a>
                                    <p className="text-3xl font-bold text-center text-[#5CA845]">Time</p>
                                    <p className="text-xl text-center mt-4 text-[#0A4154]">Monday - Friday</p>
                                    <p className="text-xl text-center mt-2 text-[#0A4154]">9:00AM - 05:00PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl m-2" style={{ background: "linear-gradient(198.17deg, #1B1E56 9.75%, #003456 49.05%, #5CA845 110.17%)" }}>
                            <h1 className="text-center text-white font-extrabold text-22 lg:text-40 pb-5 lg:pb-12">Our Contact Us</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full mx-auto">
                                    <input
                                        type="text"
                                        name="name"
                                        id="email"
                                        onChange={handleChange}
                                        value={data.name}
                                        className="bg-light-gray w-full py-2 mb-5 px-4 border-none placeholder:text-info"
                                        placeholder="Your Name"
                                    />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={data.email}
                                        className="bg-light-gray w-full py-2 mb-5 px-4 border-none placeholder:text-info"
                                        placeholder="Email"
                                    />
                                    <select name="subject" onChange={handleChange} value={data.subject} className="bg-light-gray w-full py-2 mb-5 px-4 border-none placeholder:text-info">
                                        <option>--Select Subject--</option>
                                        <option value="">Product Enquiry</option>
                                        <option value="">Used Things Enquiry</option>
                                        <option value="">Truevalue Enquiry</option>
                                    </select>
                                    <textarea name="message" onChange={handleChange} value={data.message} className="bg-light-gray w-full py-2 mb-5 px-4 border-none placeholder:text-info" placeholder="Message"></textarea>
                                    <button type="submit" className="btn bg-secondary mt-4 text-white rounded font-extrabold p-2 py-3 w-full lg:text-lg text-xs hover:bg-[#1B5651]">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Locations Block */}
                    <div className="mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Factory Location */}
                            <div className="p-4 bg-[#FAFBFF] border rounded-lg shadow-md">
                                <Image
                                    src="/images/location.png"
                                    alt="location"
                                    width={45}
                                    height={45}
                                />
                                <h2 className="text-3xl font-bold mt-4 text-[#5CA845]">Factory</h2>
                                <p className="text-gray-600">Lot 166, Jalan Sungai Pinang 5/6, Taman Perindustrian Pulau Indah Fasa 2, 42920 Pelabuhan Kelang, Selangor Darul Ehsan</p>
                            </div>
                            {/* Head Quarters Location */}
                            <div className="p-4 bg-[#FAFBFF] border rounded-lg shadow-md">
                                <Image
                                    src="/images/location.png"
                                    alt="location"
                                    width={45}
                                    height={45}
                                />
                                <h2 className="text-3xl font-bold mt-4 text-[#5CA845]">Head Quarters</h2>
                                <p className="text-gray-600">93-1 Jalan Permata 1/KS09, Pusat Perniagaan Bestari, Taman Perindustrian Air Hitam Klang, 42000 Selangor Darul Ehsan.</p>
                            </div>
                            {/* Penang Location */}
                            <div className="p-4 bg-[#FAFBFF] border rounded-lg shadow-md">
                                <Image
                                    src="/images/location.png"
                                    alt="location"
                                    width={45}
                                    height={45}
                                />
                                <h2 className="text-3xl font-bold mt-4 text-[#5CA845]">Penang</h2>
                                <p className="text-gray-600">12A, Jalan Damar, Permatang Damar Laut, 11960, Bayan Lepas, Penang. Tel: +604 255 3978 Fax: +604 255 397</p>
                            </div>
                            {/* West Malaysia Location */}
                            <div className="p-4 bg-[#FAFBFF] border rounded-lg shadow-md">
                                <Image
                                    src="/images/location.png"
                                    alt="location"
                                    width={45}
                                    height={45}
                                />
                                <h2 className="text-3xl font-bold mt-4 text-[#5CA845]">West Malaysia</h2>
                                <p className="text-gray-600">37, Kampung Merdang Lumut, Jalan Dato Mohd Musa, 94300 Kota Samarahan, Sarawak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;
