"use client";
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay } from 'date-fns';
import ReactModal from 'react-modal';

// Use useEffect to set the app element after the component mounts
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");


  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });
  const firstDayOfWeek = startOfMonthDate.getDay();

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setModalIsOpen(true);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim()) {
      setEvents([
        ...events,
        { date: selectedDate, title: eventTitle }
      ]);
      setModalIsOpen(false);
      setEventTitle("");
    }
  };

  const monthName = format(currentDate, 'MMMM yyyy');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={handlePrevMonth}>Previous</button>
        <span>{monthName}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} style={{ padding: '10px' }}>{day}</div>
        ))}

        {/* Empty days before the start of the month */}
        {Array(firstDayOfWeek).fill(null).map((_, idx) => (
          <div key={idx} style={{ padding: '10px' }}></div>
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day, index) => (
          <div key={index} style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleDayClick(day)}>
            <div>{format(day, 'd')}</div>
            {/* Display events for the day */}
            {events.filter(event => isSameDay(event.date, day)).map((event, i) => (
              <div key={i} style={{ fontSize: '12px', color: 'blue' }}>{event.title}</div>
            ))}
          </div>
        ))}

        {/* Empty days after the end of the month */}
        {Array(6 - endOfMonthDate.getDay()).fill(null).map((_, idx) => (
          <div key={idx} style={{ padding: '10px' }}></div>
        ))}
      </div>

      {/* Modal for adding events */}
      <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Add Event">
        <h2>Add Event on {format(selectedDate, 'MMMM d, yyyy')}</h2>
        <input
          type="text"
          placeholder="Event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
        <button onClick={handleAddEvent} style={{ marginTop: '10px' }}>Add Event</button>
        <button onClick={() => setModalIsOpen(false)} style={{ marginTop: '10px' }}>Close</button>
      </ReactModal>
    </div>
  );
};

export default Calendar;
