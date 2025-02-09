import React from 'react';
import Header from "@/components/Layouts/Header";
import Stepsfour from "@/components/Layouts/Stepsfour";
import CustomerProfile from '@/components/Layouts/Profile';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Welldone = () => {

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);
  console.log("Response Data" + formData )

  if (!formData) {
    return <div>Loading...</div>;
  }
    return (
      <fieldset className="px-4 lg:px-0 wellmar">
            <header className="flex items-center flex-wrap pb-6">
                <Header></Header>
            </header>
    <div className="basic-detail">
        <p className="text-primary font-bold text-base lg:text-24 mb-5 lg:mb-10 wel">
          Thank you for disposing of your E-Waste with Usedcomputer Malaysia. Kindly check your email for the copy of the booking collection summary.
        </p>
        <p className="text-primary font-bold text-base lg:text-24 mb-5 lg:mb-10 wel">Your booking number is:</p>
        <h3 className="lg:text-40 xl:text-34 pb-4 text-base font-extrabold text-primary lg:pb-8 ordernum">{formData.quotationId}</h3>
        <div className="lg:py-8 py-4">
          <button className="uppercase bg-secondary text-white py-1.5 px-4 lg:px-12 font-extrabold text-base lg:text-24 rounded lg:mr-8">Download</button>
          <button className="uppercase bg-secondary text-white py-1.5 px-4 lg:px-12 font-extrabold text-base lg:text-24 rounded">Print</button>
        </div>
        <div className="border-gradient relative p-6 lg:p-10 my-10 lg:my-20">
          <div className="absolute -top-8 lg:-top-11 left-0 right-0">
            <img src="./images/driver.png" alt="Driver" className="w-60 lg:w-80 mx-auto" />
          </div>
          <h3 className="uppercase text-center text-primary font-bold text-28 md:text-40 xl:text-64 pt-8 lg:pt-16 pb-8 weldone">WELL DONE!</h3>
          <p className="text-primary font-bold text-base lg:text-22 mb-5 lg:mb-10 kmwith">
            With the amount of disposal collected, you have just managed to accumulate and recycle these materials:
          </p>
          <div className="py-6 lg:py-14 lg:pb-20 grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-14 lg:px-10">
            {/* Plastic */}
            <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
              <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
                <img src="./images/recycle.png" alt="Recycle" className="recycle mx-auto h-32" />
              </div>
              <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
                <span className="text-white font-semibold text-sm lg:text-base pb-1">PLASTIC</span>
                <h6 className="text-white font-extrabold text-22 lg:text-28">5324g</h6>
              </div>
            </div>
            {/* Gold */}
            <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
              <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
                <h3 className="font-semibold text-center text-64 text-white">Au</h3>
              </div>
              <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
                <span className="text-white font-semibold text-sm lg:text-base pb-1">GOLD</span>
                <h6 className="text-white font-extrabold text-22 lg:text-28">0.4g</h6>
              </div>
            </div>
            {/* Copper */}
            <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
              <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
                <h3 className="font-semibold text-center text-64 text-white">Cu</h3>
              </div>
              <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
                <span className="text-white font-semibold text-sm lg:text-base pb-1">COPPER</span>
                <h6 className="text-white font-extrabold text-22 lg:text-28">24g</h6>
              </div>
            </div>
            {/* Aluminium */}
            <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
              <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
                <h3 className="font-semibold text-center text-64 text-white">Al</h3>
              </div>
              <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
                <span className="text-white font-semibold text-sm lg:text-base pb-1">ALUMINIUM</span>
                <h6 className="text-white font-extrabold text-22 lg:text-28">5.3g</h6>
              </div>
            </div>
          </div>
          <p className="text-primary font-semibold text-22 lg:text-28 xl:text-34 ordernum">
            You have just collected a total of <span className="text-secondary font-extrabold">7kg</span> of E-Waste. When correctly recycled, this saves up to <span className="text-secondary font-extrabold">10.3kg of CO2 equivalent.</span>
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 pt-12">
            <div className="lg:border-r-2 lg:mr-14">
              <img src="/images/save-earth.png" alt="Save Earth" className="h-72 mx-auto" />
            </div>
            <div>
              <h4 className="text-primary font-bold text-base lg:text-22 mb-5 lg:mb-10 ordernum">YOUR CO2 SAVING EQUALS<br></br> TO A DRIVE OF:</h4>
              <h1 className="text-secondary font-bold text-sm lg:text-22 lg:text-64 km">4.5KM</h1>
            </div>
          </div>
        </div>
        </div>
      </fieldset>
      
    );
  };
  
  export default Welldone;
  