import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios"; // Ensure axios is imported
import 'react-calendar/dist/Calendar.css';
import './BookingCalendar.css';

const BookingCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  // Fetch booking data from API
  const fetchCounts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${process.env.API_URL}booking/search/fc`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("API Response:", response.data); // Log the entire response to check its structure
      if (response.data) {
        // Set the fetched bookings in the state
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching booking counts:", error);
      toast.error("Failed to fetch counts.", { position: "top-right" });
    }
  };

  // Utility function to convert a date to UTC date string (YYYY-MM-DD)
  const getUTCDateString = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Map fetched data to a structure suitable for the calendar
  const events = bookings.reduce((acc, { bookingDate, bookingId, status }) => {
    // Parse the bookingDate as UTC and store it
    const dateKey = new Date(bookingDate).toISOString().split("T")[0]; // Ensure bookingDate is in UTC
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({ bookingId, status });
    return acc;
  }, {});

  // Event rendering logic for the calendar tiles
  const tileContent = ({ date }) => {
    // Get the date for the tile in UTC (without time)
    const formattedTileDate = getUTCDateString(date); 

    if (events[formattedTileDate]) {
      return (
        <div>
          {events[formattedTileDate].map((event, index) => (
            <div key={index}>
              <span>{event.bookingId} - {event.status}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchCounts();
  }, []);

  // Inline styles for the calendar
  const calendarStyles = {
    fontSize: '1.5rem', // Increase font size
    width: '100%', // Set width of the calendar
    margin: '0 auto', // Center the calendar
  };

  return (
    <div>
      <h1 className="text-center">Booking Calendar</h1>
      <br></br>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        style={calendarStyles} // Apply inline styles for the calendar
      />
    </div>
  );
};

export default BookingCalendar;
