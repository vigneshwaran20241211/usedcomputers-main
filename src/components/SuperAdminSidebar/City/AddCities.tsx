"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FormElements = (params) => {
  const accessToken = localStorage.getItem("accessToken");
  const [data, setData] = useState({
    id: "",
    country_id: "",
    state_id: "",
    title: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);  // Changed cities to states
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const [selectedState, setSelectedState] = useState(""); // New state for selected state
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all countries
    axios
      .get(`${process.env.API_URL}country/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((result) => setCountries(result.data.data))
      .catch((error) => console.error(error));

    if (params.id !== "new") {
      // Fetch city details if we are editing an existing city
      axios
        .get(`${process.env.API_URL}city/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setSelectedCountry(response.data.country_id);  // Set selected country
          setSelectedState(response.data.state_id); // Set selected state
        })
        .catch((error) => console.error(error));
    }
  }, [params.id]);

  useEffect(() => {
    // Fetch states when a country is selected
    console.log(selectedCountry)
    if (selectedCountry) {
      axios
        .get(`${process.env.API_URL}country/${selectedCountry}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setStates(response.data.states)
          console.log(states)
        }) // Populate states based on the selected country
        .catch((error) => console.error(error));
    }
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.name)
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === 'state_id') {
      setSelectedState(e.target.value);
    }

    if (name === "country_id") {
      setSelectedCountry(value);  // Update selected country
      setSelectedState(""); // Reset state when country changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (data.id) {
        console.log(data);
        response = await axios.put(
          `${process.env.API_URL}city/${data.id}`,
          { id: data.id, country_id: data.country_id, state_id: data.state_id, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }

        );
        console.log("Response:", response.data); // Optional logging
        alert("City Updated Successfully 🎉");
        router.push("/superadmin/master/viewcity");
      } else {
        axios
          .post(`${process.env.API_URL}city`, data, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
          );
        alert("City Created Successfully 🎉");
      }
      router.push("/superadmin/master/viewcity");
    } catch (error) {
      const err = error.response ? error.response.data : error.message;
      setError(err?.message || "An unknown error occurred");
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Master / City" />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">Add | Edit - City</h3>
              <Link href="/superadmin/master/viewstate">
                <button
                  type="button"
                  className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Back
                </button>
              </Link>
              <br />
              <br />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="w-full mb-4">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a country
                  </label>
                  <select
                    id="countries"
                    name="country_id"
                    onChange={handleChange}
                    value={selectedCountry} // Set the selected country
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Choose a country
                    </option>
                    {countries.map((value) => (
                      <option key={value._id} value={value._id} className="text-gray-700">
                        {value.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="state_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a State
                  </label>
                  <select
                    id="state_id"
                    name="state_id"
                    onChange={handleChange}
                    value={selectedState} // Set the selected state
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Choose a state
                    </option>
                    {Array.isArray(states) && states.map((value) => (
                      <option key={value._id} value={value._id} className="text-gray-700">
                        {value.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="state_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City Name
                  </label>
                  <input
                    type="text"
                    id="state_name"
                    name="title"
                    value={data.title || ""} // Ensure the city title is pre-filled if editing
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the city name"
                    required
                  />
                </div>

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
    </>
  );
};

export default FormElements;
