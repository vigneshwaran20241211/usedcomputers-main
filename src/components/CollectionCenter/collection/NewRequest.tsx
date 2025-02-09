import React from 'react';

const WasteCollectionCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="bg-blue-500 p-4 rounded-lg mb-4"> {/* Changed background color to blue-500 */}
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-lg font-semibold">Waste Collection</h2> {/* Changed text color to white */}
                    <button className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded"> {/* Changed button colors */}
                        Create New Request
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                    <h3 className="text-md font-semibold mb-2 bg-blue-500 text-white p-2 rounded-t-lg">Status</h3> {/* Added background and text color */}
                    <p className="text-gray-500">Last Update: 22/1/2025</p>

                    <h3 className="text-md font-semibold mb-2 bg-blue-500 text-white p-2 rounded-t-lg">Waste Generator</h3>
                    <p className="text-gray-500">
                        060874 - TIERRA RESOURCES SDN BHD
                    </p>
                    <h3 className="text-md font-semibold mb-2 bg-blue-500 text-white p-2 rounded-t-lg">Collection Address</h3>
                    <p className="text-gray-500">
                    NO 624 JALAN 24 TAMAN PERINDUSTRIAN EHSAN JAYA , 52100, KUALA LUMPUR, W/P KUALA LUMPUR
                    </p>
                    <h3 className="text-md font-semibold mb-2 bg-blue-500 text-white p-2 rounded-t-lg">Total Pallet</h3>
                    <p className="text-gray-500">0</p>
                    <h3 className="text-md font-semibold mb-2 bg-blue-500 text-white p-2 rounded-t-lg">Person In Charge</h3>
                    <ul className="list-none">
                        <li className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0" />
                            </svg>
                            <span>-</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M3 8.25V20.25A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 20.25V8.25M16.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM8.25 8.25H12m0-3h4.125c1.12 0 2.0005.88 2.0005 2v9.75a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V11.25a2.25 2.25 0 012.25-2.25h4.125m0-3L5.25 3" />
                            </svg>
                            <span>info@tmrecycle.com.my</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M16.5 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0" />
                            </svg>
                            <span>03-62628835</span>
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                <path strokeLinejoin="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25H19.5a7.5 7.5 0 00-15-7.5V6.75z" />
                            </svg>
                            <span>03-62628835</span>
                        </li>
                    </ul>
                </div>

                {/* Right Column */}
                <div>
    <h3 className="text-md font-semibold mb-2">Propose Date Pickup</h3>
    <div className="flex items-center">
        <input
            type="radio"
            name="date-pickup"
            id="single-date"
            className="mr-2"
            required
        />
        <label htmlFor="single-date">Single Date</label>
    </div>
    <div className="flex items-center mt-2">
        <input
            type="radio"
            name="date-pickup"
            id="multiple-date"
            className="mr-2"
            required
        />
        <label htmlFor="multiple-date">Multiple Dates</label>
    </div>

    <p className="text-gray-500 mt-4">Date must be 5 days in advance</p>

    <h3 className="text-md font-semibold mt-4">Collection Address</h3>
    <div className="grid grid-cols-3 gap-4">
        <div>
            <label htmlFor="city">City</label>
            <select
                id="city"
                className="border border-gray-300 rounded-md p-2 w-full"
                required
            >
                <option value="">Select City</option>
                <option value="KUALA LUMPUR">KUALA LUMPUR</option>
                {/* Add more city options here */}
            </select>
        </div>
        <div>
            <label htmlFor="region">Region</label>
            <select
                id="region"
                className="border border-gray-300 rounded-md p-2 w-full"
                required
            >
                <option value="">Select Region</option>
                <option value="W/P KUALA LUMPUR">W/P KUALA LUMPUR</option>
                {/* Add more region options here */}
            </select>
        </div>
        <div>
            <label htmlFor="country">Country</label>
            <select
                id="country"
                className="border border-gray-300 rounded-md p-2 w-full"
                required
            >
                <option value="">Select Country</option>
                <option value="MALAYSIA">MALAYSIA</option>
                {/* Add more country options here */}
            </select>
        </div>
    </div>

    <div className="mt-4">
        <label htmlFor="address">Address</label>
        <textarea
            id="address"
            rows="4"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="NO 624 JALAN 24 TAMAN PERINDUSTRIAN EHSAN JAYA, 52100, KUALA LUMPUR, W/P KUALA LUMPUR"
            required
        ></textarea>
    </div>

    <div className="mt-4">
        <label htmlFor="postalCode">Postal Code</label>
        <input
            type="text"
            id="postalCode"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        />
    </div>

    <div className="mt-4">
        <label htmlFor="contactPerson">Contact Person</label>
        <input
            type="text"
            id="contactPerson"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        />
    </div>

    <div className="mt-4">
        <label htmlFor="contactNumber">Contact Number</label>
        <input
            type="tel"
            id="contactNumber"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        />
    </div>

    <div className="mt-4">
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        />
    </div>

    <div className="mt-4">
        <label htmlFor="faxNumber">Fax Number</label>
        <input
            type="tel"
            id="faxNumber"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        />
    </div>

    <div className="mt-4">
        <label htmlFor="selectTSM">Select TSM</label>
        <select
            id="selectTSM"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        >
            <option value="">Select TSM</option>
            {/* Add TSM options here */}
        </select>
    </div>

    <div className="mt-4">
        <label htmlFor="preferredVehicleType">Preferred Vehicle Type</label>
        <select
            id="preferredVehicleType"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
        >
            <option value="">Select Vehicle Type</option>
            {/* Add vehicle type options here */}
        </select>
    </div>

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        + Add New Waste
    </button>
        <br></br>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
            <tr className="border-b border-gray-300">
                <th className="border border-gray-300 p-2">WASTE CODE</th>
                <th className="border border-gray-300 p-2">ITEM CODE</th>
                <th className="border border-gray-300 p-2">WASTE NAME</th>
                <th className="border border-gray-300 p-2">DOE CODE</th>
               
            </tr>
        </thead>
        <tbody className="overflow-x-auto">
            {/* Add rows here dynamically using JavaScript */}
            <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              
            </tr>
        </tbody>
    </table>
</div>
            </div>
        </div>
    );
};

export default WasteCollectionCard;