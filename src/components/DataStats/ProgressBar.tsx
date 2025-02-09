"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProgressCards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateNames, setStateNames] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch API data with pagination and process the results
  const fetchData = async (page) => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const result = await axios.get(`${process.env.API_URL}booking/search/CC`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (Array.isArray(result.data.data)) {
        setData(result.data.data);
        setTotalPages(result.data.lastPage || 1);

        // // Fetch state names for each booking's stateId
        // result.data.data.forEach((booking) => {
        //   if (booking.stateId && !stateNames[booking.stateId]) {
        //     fetchStateName(booking.stateId);
        //   }
        // });
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch state name by stateId (implement this based on your logic)
  const fetchStateName = async (stateId) => {
    try {
      // Example fetch state name by stateId, you should replace this with your actual logic
      const stateName = await axios.get(`${process.env.API_URL}/state/${stateId}`);
      setStateNames((prevState) => ({
        ...prevState,
        [stateId]: stateName.data.name,
      }));
    } catch (error) {
      console.error("Error fetching state name:", error);
    }
  };

  // Fetch data when the component mounts and when currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate parts data from the fetched API response
  const partsData = {
    Gold: 0,
    Aluminium: 0,
    Copper: 0,
    Plastic: 0,
  };

  if (data) {
    data.forEach((item) => {
      item.category.forEach((category) => {
        category.products.forEach((product) => {
          Object.values(product.parts).forEach((part) => {
            if (part.title === "Gold") {
              partsData.Gold += part.quantity;
            } else if (part.title === "Aluminium") {
              partsData.Aluminium += part.quantity;
            } else if (part.title === "Copper") {
              partsData.Copper += part.quantity;
            } else if (part.title === "Plastic") {
              partsData.Plastic += part.quantity;
            }
          });
        });
      });
    });
  }

  const totalQuantity = Object.values(partsData).reduce((a, b) => a + b, 0);

  const progressPercentage = {
    Gold: (partsData.Gold / totalQuantity) * 100,
    Aluminium: (partsData.Aluminium / totalQuantity) * 100,
    Copper: (partsData.Copper / totalQuantity) * 100,
    Plastic: (partsData.Plastic / totalQuantity) * 100,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Gold Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Gold</h3>
        <div className="bg-gray-200 h-4 rounded-full mb-4">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${progressPercentage.Gold}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Gold: {partsData.Gold}  Kgrm</p>
      </div>

      {/* Aluminium Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Aluminium</h3>
        <div className="bg-gray-200 h-4 rounded-full mb-4">
          <div
            className="bg-gray-500 h-4 rounded-full"
            style={{ width: `${progressPercentage.Aluminium}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Aluminium: {partsData.Aluminium}  Kgrm</p>
      </div>

      {/* Copper Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Copper</h3>
        <div className="bg-gray-200 h-4 rounded-full mb-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${progressPercentage.Copper}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Copper: {partsData.Copper}  Kgrm</p>
      </div>

      {/* Plastic Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Plastic</h3>
        <div className="bg-gray-200 h-4 rounded-full mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progressPercentage.Plastic}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Plastic: {partsData.Plastic} Kgrm</p>
      </div>
    </div>
  );
};

export default ProgressCards;
