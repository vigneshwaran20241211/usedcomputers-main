import React, { useState, useEffect } from 'react';

const WasteCollectionReport = () => {
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-01-31');
  const [reportData, setReportData] = useState([]);
  const [cnNo, setCnNo] = useState('');
  const [receiver, setReceiver] = useState('');
  const [sortBy, setSortBy] = useState('Date Received'); // Default sorting

  // Sample receiver options (replace with actual data)
  const receiverOptions = [
    { value: '', label: 'All' },
    { value: 'CENVIRO RECYCLING & RECOVERY', label: 'CENVIRO RECYCLING & RECOVERY' },
    { value: 'KUALITI ALAM SDN BHD', label: 'KUALITI ALAM SDN BHD' },
  ];

  useEffect(() => {
    // Fetch data from API based on filters
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/getWasteData?fromDate=${fromDate}&toDate=${toDate}&cnNo=${cnNo}&receiver=${receiver}`
        );
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fromDate, toDate, cnNo, receiver]);

  // Sorting function
  const sortedData = reportData.sort((a, b) => {
    if (sortBy === 'Date Received') {
      return new Date(a.dateReceived) - new Date(b.dateReceived);
    } else if (sortBy === 'CN No') {
      return a.cnNo.localeCompare(b.cnNo);
    }
    // Add more sorting options as needed
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Waste Disposal Report</h2>

      <div className="flex justify-between mb-4">
        <div className="flex items-center col-lg-4">
          <label htmlFor="fromDate" className="text-sm font-medium mr-2">From:</label>
          <br />
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
        </div>

        <div className="flex items-center col-lg-4">
          <label htmlFor="toDate" className="text-sm font-medium mr-2">To:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex items-center col-lg-4">
          <label htmlFor="receiver" className="text-sm font-medium mr-2">Receiver:</label>
          <select
            id="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            {receiverOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      
      </div>

      <div className="flex justify-between mb-4">

      <div className="flex items-center col-lg-4">
          <label htmlFor="cnNo" className="text-sm font-medium mr-2">Treatment Type:</label>
          <select
            id="cnNo"
            value={cnNo}
            onChange={(e) => setCnNo(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">INCINERATION</option>
            <option value="">LAND FILL</option>
            <option value="">PCT</option>
          </select>
        </div>
        <div className="flex items-center col-lg-4">
          <label htmlFor="sortBy" className="text-sm font-medium mr-2">Sorting By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="CN No">CN Desc</option>
            <option value="CN No">CN Asc</option>
            <option value="CN No">CN Asc</option>
            <option value="CN No">Collection Date Desc</option>
            <option value="CN No">Collection Date Asc</option>
          </select>
        </div>

        <div className="flex items-center col-lg-4">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          >
            Search
          </button>
        </div>
      </div>

      <div className="row">
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <div className="col-lg-4" key={item.id}>
              {/* Display each field of the report data here */}
              <p><b>Date Received:</b> {item.dateReceived}</p>
              <p><b>CN No:</b> {item.cnNo}</p>
              {/* Add more fields as needed */}
            </div>
          ))
        ) : (
          <p>No data found for the selected filters.</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Waste Disposal Report</h2>

      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Export Excel
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Export PDF
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <span>From: 01/01/2025</span>
        <span>To: 31/01/2025</span>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Date Received</th>
            <th className="border p-2">	CN No.</th>
            <th className="border p-2">Disposal Date</th>
            <th className="border p-2">DOE Code</th>
            <th className="border p-2">Packaging Type</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Weight (MT)</th>
            <th className="border p-2">Treatment</th>
            <th className="border p-2">Receiver</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row) => (
            <tr key={row.id}> 
              <td className="border p-2">{row.dateReceived}</td>
              <td className="border p-2">{row.vehicleNo}</td>
              <td className="border p-2">{row.cnNo}</td>
              <td className="border p-2">{row.wasteCategory}</td>
              <td className="border p-2">{row.wasteName}</td>
              <td className="border p-2">{row.packagingType}</td>
              <td className="border p-2">{row.qty}</td>
              <td className="border p-2">{row.weight}</td>
              <td className="border p-2">{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <span>Total Qty: {reportData.reduce((total, row) => total + row.qty, 0)}</span>
        <span>Total Weight: {reportData.reduce((total, row) => total + row.weight, 0.000)} MT</span>
      </div>
    </div>
    </div>
    
  );
};

export default WasteCollectionReport;