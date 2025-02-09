import { useState } from 'react';

const DateFilterComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<any[]>([]); // Assuming bookings are in an array
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Assuming you have the accessToken saved in localStorage/sessionStorage
  const accessToken = localStorage.getItem('accessToken'); // You can replace this with your logic for getting the token

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleApplyFilter = async () => {
    if (!accessToken) {
      setError('Access token is missing');
      return;
    }

    try {
      setLoading(true);
      setError(null); // Reset error message before making request
      
      const filters: Record<string, any> = {};
      
      // Prepare the filters based on selected values
      if (status !== 'All') {
        filters.status = status;
      }
      if (startDate) {
        filters.createdDateFrom = startDate.toISOString();
      }
      if (endDate) {
        filters.createdDateTo = endDate.toISOString();
      }
      if (searchTerm) {
        filters.searchTerm = searchTerm;
      }

      console.log('Filters:', filters); // Debugging: log the filters to ensure they're correct

      const apiUrl = `${process.env.API_URL}booking/search/FC`; // Verify this URL
      console.log('API URL:', apiUrl); // Debugging: log the full URL to verify it's correct

      // Make the API call with the accessToken in Authorization header
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(filters),
      });

       console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debugging: log the response data

      if (data.data) {
        setBookings(data.data); // Assuming the response contains a 'data' field with bookings
      } else {
        setBookings([]); // Clear bookings if no data
      }
    } catch (error: any) {
      console.error(error);
      setError(`An error occurred while fetching bookings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <label htmlFor="status" className="mr-2">
          Status
        </label>
        <select
          id="status"
          className="border border-gray-300 rounded px-4 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Approved</option>
          <option>Cancelled</option>
          <option>Rejected</option>
        </select>

        <div className="flex items-center ml-4">
          <label htmlFor="start-date" className="mr-2">
            Proposed Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="flex items-center ml-4">
          <label htmlFor="end-date" className="mr-2">
            Actual Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleApplyFilter}
        >
          Apply
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render filtered bookings */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Bookings</h3>
        <ul>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id} className="mb-4">
                <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Created At:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${booking.total}</p>
                <p><strong>Total Paid:</strong> ${booking.totalPaid}</p>
                <p><strong>Location:</strong> ({booking.lat}, {booking.lng})</p>

                <div>
                  <h4 className="font-semibold mt-2">Category</h4>
                  {booking.category.map((category: any) => (
                    <div key={category._id}>
                      <p><strong>Title:</strong> {category.title}</p>
                      <ul>
                        {category.products.map((product: any) => (
                          <li key={product._id}>
                            <p><strong>Product:</strong> {product.title}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DateFilterComponent;
