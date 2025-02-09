import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Event {
  date: Date;
  status: string;
}

interface CalendarComponentProps {
  events: Event[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events }) => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const onChange = (newDate: Date | Date[]) => {
    setDate(newDate);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const event = events.find(event => event.date.toDateString() === date.toDateString());
      return event ? `highlight-${event.status.toLowerCase()}` : null;
    }
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarComponent;
