"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/components/Layouts/Header";
import Stepsthree from "@/components/Layouts/Stepsthree";
import CustomerProfile from '@/components/Layouts/Profile';
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Earncash = ({ formData, onChange }) => {

    const { selectedData, session, date, ordertype } = useSelector(
        (state: any) => state.products,
    );

    const router = useRouter();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state
    const [stateId, setStateId] = useState(null);
    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');
    const accessToken = localStorage.getItem("accessToken");
    const state = localStorage.getItem('state');
    const [error, setError] = useState(""); // Manage error message

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userDetails')));
        axios.get(`${process.env.API_URL}state/all?page=1&limit=100&term=${state}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(res => setStateId(res.data.data[0].id))
        .catch(error => console.log(error));
    }, [accessToken, state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!accessToken) {
            setError("No access token found. Please log in.");
            console.error("No access token found. Please log in.");
            return;
        }

        // Validate lat and lng
        if (!lat || !lng) {
            setError("Location not found. Please enable location services.");
            console.error("Location not found. Please enable location services.");
            return;
        }

        setLoading(true); // Set loading to true before making the request

        try {
            const response = await axios.post(
                `${process.env.API_URL}quotation`,
                {
                    "userId": user._id,
                    "lat": lat,
                    "lng": lng,
                    "location": [lng, lat], // Use lat and lng from localStorage here
                    "quotationType": ordertype.pickup
                        ? "PICKUP"
                        : ordertype.drop
                        ? "DROPOFF"
                        : null,
                    "stateId": stateId,
                    "category": selectedData,
                    "quotationDate": `${date.year}-${date.month}-${date.date}`,
                    "quotationSession": session.morning
                        ? "MORNING"
                        : session.afternoon
                        ? "AFTERNOON"
                        : session.evening
                        ? "EVENING"
                        : null,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            sessionStorage.setItem("formData", JSON.stringify(response.data));
            toast.success("Quotation Requested Successfully!!", { position: "top-right" });
            console.log('Quotation Requested Successfully!', response);

            router.push("/welldone");
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data) {
                // Show error messages from the API response
                const errorMessages = error.response.data.message.join(", ");
                setError(errorMessages); // Set the error messages
                toast.error(errorMessages, { position: "top-right" }); // Display error as toast
            } else {
                setError("An unexpected error occurred. Please try again.");
                toast.error("An unexpected error occurred. Please try again.", { position: "top-right" });
            }
        } finally {
            setLoading(false); // Set loading to false once the request is completed
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            setError("No access token found. Please log in.");
            console.error("No access token found. Please log in.");
            return;
        }

        // Validate lat and lng
        if (!lat || !lng) {
            setError("Location not found. Please enable location services.");
            console.error("Location not found. Please enable location services.");
            return;
        }

        setLoading(true); // Set loading to true before making the request

        try {
            const res = await axios.post(
                `${process.env.API_URL}booking`,
                {
                    "userId": user._id,
                    "lat": lat,
                    "lng": lng,
                    "location": [lng, lat], // Use lat and lng from localStorage here
                    "stateId": stateId,
                    "category": selectedData,
                    "bookingDate": `${date.year}-${date.month}-${date.date}`,
                    "bookingSession": session.morning
                        ? "MORNING"
                        : session.afternoon
                        ? "AFTERNOON"
                        : session.evening
                        ? "EVENING"
                        : null,
                    "bookingType": ordertype.pickup
                        ? "PICKUP"
                        : ordertype.drop
                        ? "DROPOFF"
                        : null,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            sessionStorage.setItem("formbookingData", JSON.stringify(res.data));
            toast.success("Booking Successfully!!", { position: "top-right" });
            console.log('Booking Successfully!', res);

            router.push("/welldonebooking");
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data) {
                const errorMessages = error.response.data.message.join(", ");
                setError(errorMessages); // Set the error messages
                toast.error(errorMessages, { position: "top-right" });
            } else {
                setError("An unexpected error occurred. Please try again.");
                toast.error("An unexpected error occurred. Please try again.", { position: "top-right" });
            }
        } finally {
            setLoading(false); // Set loading to false once the request is completed
        }
    };

    const paymentMethods = ['fbx', 'visa', 'boost', 'tng'];
    const bankOptions = [
        'affian', 'alliance', 'amb', 'bislam', 'bra', 'b-mum', 'bsn', 'cimb',
        'honglong', 'hsbc', 'kfh', 'maybank', 'maybank2e', 'ocbc', 'public',
        'rhb', 'sc', 'uob',
    ];
    const footerLogos = [
        'fbx-s', 'vvisa-s', 'visa-s', 'master-s', 'mas-s', 'boost-s', 'tng-s', 'geo',
    ];

    return (
        <fieldset className="px-4 lg:px-0">
            <header className="flex items-center flex-wrap pb-6">
                <Header />
            </header>
            <Stepsthree />
            <div className="basic-detail">
                <h1 className="text-primary font-semibold userdetails uppercase text-22 lg:text-34 xl:text-64 pb-4 lg:pb-8">
                    Choose Your Cash Back Method
                </h1>
                <CustomerProfile />
                <h3 className="font-extrabold userdetails text-primary text-base lg:text-24 xl:text-34 pb-4 lg:pb-8">
                    Select Payment Method
                </h3>
                <div className="border border-dashed border-primary"></div>

                <div className="border-b border-dashed border-primary">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7 py-5 lg:py-14">
                        {paymentMethods.map((img, idx) => (
                            <div key={idx} className="bg-light-gray flex items-center p-4 h-28 rounded">
                                <img
                                    src={`../images/bank/${img}.png`}
                                    alt={`Payment method ${img}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-b border-dashed border-primary">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-7 py-5 lg:py-14">
                        {bankOptions.map((img, idx) => (
                            <div key={idx} className="bg-light-gray flex items-center p-4 h-28 rounded">
                                <img
                                    src={`../images/bank/${img}.png`}
                                    alt={`Bank logo ${img}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display error message if exists */}
                {error && (
                    <div className="text-red-500 text-center py-4">
                        <p>{error}</p>
                    </div>
                )}

                <div className="pt-4 lg:pt-10 pb-6 lg:pb-20">
                    <ul className="list-disc pl-5 text-gray-500 uppercase font-medium text-base lg:text-22">
                        <li>Please ensure your browser pop-up blocker is disabled.</li>
                        <li>
                            By proceeding, you have read and agreed to{' '}

                            <a href="#" className="text-secondary">
                                Terms & Conditions
                            </a>
                            .
                        </li>
                    </ul>
                </div>

                <div className="text-center lg:px-10 pt-4 pb-4 lg:pb-20">
                    <button
                        onClick={handleSubmit}
                        className={`how-it-works uppercase text-white font-extrabold py-3 lg:py-5 text-22 lg:text-40 ml-20 p-4 conformbook ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Loading...' : 'Quotation'}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`how-it-works uppercase text-white font-extrabold py-3 lg:py-5 text-22 lg:text-40 ml-20 p-4 conformbook ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Loading...' : 'Booking Confirm'}
                    </button>
                </div>

                <div className="border-b border-dashed border-primary py-4 lg:py-7">
                    <ul className="flex flex-wrap items-center justify-center">
                        {footerLogos.map((img, idx) => (
                            <li key={idx}>
                                <img
                                    src={`../images/bank/${img}.png`}
                                    alt={`Footer logo ${img}`}
                                    className="w-28"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-gray-500 font-medium py-3 lg:py-5">
                    By proceeding, you agree to authorize senangPay (Simplepay Gateway Sdn Bhd) to credit the above net amount to your debit/credit card or online banking account.
                </p>
            </div>
        </fieldset>
    );
};

export default Earncash;
