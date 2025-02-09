// components/PaymentStatus.js

import React from 'react';

const PaymentStatus = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Payment Status</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Sync Invoices
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-center text-lg font-semibold">Credit Status</h3>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Overdue</h3>
          <p className="text-2xl font-bold">0.00 MYR</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Invoice</h3>
          <p className="text-2xl font-bold">0.00 MYR</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Overdue Invoice</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg pl-10"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Advanced filters
        </button>
      </div>

      <div className="mt-4">
        <p className="text-center text-gray-500">No data available</p>
      </div>
    </div>
  );
};

export default PaymentStatus;