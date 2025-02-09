"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { count } from "console";

const FormElements = (params) => {
  console.log(params);
  const router = useRouter();
  const [country, setCountry] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [data, setData] = useState({
    id: "",
    country_id: "",
    title: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios.get(`${process.env.API_URL}country/all`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(result => setCountry(result.data.data))
      .catch(error => console.error(error));

    if (params.id !== "new") {
      axios.get(`${process.env.API_URL}state/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => setData(response.data))
      .catch(error => console.error(error));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setError("No access token found. Please log in.");
      return;
    }

    try {
      let response;
      if (data.id) {
        console.log(data);
        response = await axios.put(
          `${process.env.API_URL}state/${data.id}`,
          { id:data.id, country_id: data.country_id, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
          
        );
        console.log("Response:", response.data); // Optional logging
        toast.success("State Updated Successfully 🎉");
      } else {
        response = await axios.post(
          `${process.env.API_URL}state`,
          { country_id: data.country_id, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("State Created Successfully 🎉");
      }
      router.push("/superadmin/master/viewstate");
    } catch (error) {
      const err = error.response ? error.response.data : error.message;
      setError(err?.message || "An unknown error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Master / State" />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Add State
              </h3>
              <Link href="/superadmin/master/viewstate">
                <button 
                  type="button" 
                  className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Back
                </button>
              </Link>
              <br /><br />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="w-full">
                  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a country</label>
                  <input
                    type="hidden"
                    name="id"
                    onChange={handleChange}
                    value={data.id}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  <select
                    id="countries"
                    name="country_id"
                    onChange={handleChange}
                    value={data.country_id}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option selected className="text-gray-500">Choose a country</option>
                    {country.map(value => (
                      <option key={value.id} value={value.id} className="text-gray-700">
                        {value.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={data.title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter a State Name"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="mb-4.5 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default FormElements;
