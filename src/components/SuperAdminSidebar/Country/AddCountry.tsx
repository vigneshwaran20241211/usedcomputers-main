"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddCountry = (params) => {
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");
  const [data, setData] = useState({
    id: "",
    code: "",
    title: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(params);
    if (params.id != "new") {
      axios
        .get(`${process.env.API_URL}booking/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setData({ id: data.id, code: data.code, title: data.title });
        });
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!accessToken) {
      setError("No access token found. Please log in.");
      console.error("No access token found. Please log in.");
      return; // Exit early if no token
    }

    try {
      if (data.id) {
        const response = await axios.put(
          `${process.env.API_URL}country/${data.id}`,
          { id:data.id, code: data.code, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("Response:", response.data); // Optional logging
        toast.success("Country Updated Successfully 🎉", {
          position: "top-right",
        });
      } else {
        const response = await axios.post(
          `${process.env.API_URL}country`,
          { code: data.code, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.success("Country Created Successfully 🎉", {
          position: "top-right",
        });
      }
      router.push("/superadmin/master/viewcountry");
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred";

      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  return (
    <>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <ToastContainer />
        {/* Breadcrumb Component */}
        <Breadcrumb pageName="Master / Country" />

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 lg:grid-cols-1">
          <div className="flex flex-col gap-9">
            {/* Contact Form */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Add Country
                </h3>
                <Link href="/superadmin/master/viewcountry">
                  <button
                    type="button"
                    className="float-right mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Back
                  </button>
                </Link>
                <br></br>
                <br></br>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country Code
                    </label>
                    <input
                      type="hidden"
                      name="id"
                      onChange={handleChange}
                      value={data.id}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter a Country id"
                      required
                    />
                    <input
                      type="text"
                      name="code"
                      onChange={handleChange}
                      value={data.code}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter a Country Code"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={data.title}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter a Country Name"
                      required
                    />
                  </div>
                  {error && (
                    <p className="mb-4.5 text-sm text-red-500">{error}</p>
                  )}
                  <br></br>
                  <button
                    type="submit"
                    className="mb-4.5 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default AddCountry;
