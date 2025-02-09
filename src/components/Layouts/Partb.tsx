import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setSession } from "../../redux/productsSlice";

const DateAndTimePicker = () => {
  const dispatch = useDispatch();
  const { date, session } = useSelector((state: RootState) => state.products);

  const [selectedSessions, setSelectedSessions] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const handleSessionChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      // Uncheck all other sessions and only check the clicked session
      setSelectedSessions({
        morning: false,
        afternoon: false,
        evening: false,
        [name]: true,
      });

      // Dispatch the session update to Redux
      dispatch(setSession({
        morning: name === "morning",
        afternoon: name === "afternoon",
        evening: name === "evening",
      }));
    } else {
      // Uncheck the session
      setSelectedSessions({
        ...selectedSessions,
        [name]: false,
      });

      // Dispatch the session update to Redux
      dispatch(setSession({
        morning: false,
        afternoon: false,
        evening: false,
      }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDate = { ...date, [name]: value };
    dispatch(setDate(newDate));
  };

  return (
    <div>
      {/* Header Section */}
      <div className="question">
        <div className="my-8 flex items-center space-x-4">
          <span className="text-30 md:text-34 xl:text-64 hellouser font-semibold text-primary">
            B.
          </span>
          <h6 className="active-linear-gradient lg:text-22 xl:text-28 ainside flex-grow rounded-full p-3 text-base font-bold uppercase text-white lg:p-4">
            PLEASE CHOOSE THE DATE AND PREFERRED TIME SLOT FOR DISPOSAL
          </h6>
        </div>
      </div>

      {/* Date and Time Slot Section */}
      <div className="my-8 flex flex-wrap items-center">
        {/* Date Input Section */}
        <div className="flex flex-wrap items-center">
          <h6 className="xl:text-22 productstepper pr-3 text-sm font-extrabold text-primary md:text-base">
            DATE:
          </h6>
          <div className="flex items-center">
            <select
              name="date"
              value={date.date}
              className="bg-light-gray-date mx-1 h-7 w-16 p-1 text-sm font-bold text-primary datefield"
              onChange={handleDateChange}
            >
              <option value="">Date</option>
              {Array.from({ length: 31 }, (_, index) => {
                const day = (index + 1).toString().padStart(2, "0");
                return (
                  <option key={day} value={day}>
                    {day}
                  </option>
                );
              })}
            </select>
            <select
              name="month"
              value={date.month}
              className="bg-light-gray-date mx-1 h-7 w-16 p-1 text-sm font-bold text-primary datefield"
              onChange={handleDateChange}
            >
              <option value="">Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <input
              type="text"
              name="year"
              value={date.year}
              onChange={handleDateChange}
              className="bg-light-gray-date mx-1 h-7 w-16 p-1 text-sm font-bold text-primary"
              placeholder="YYYY"
            />
          </div>
        </div>

        {/* Session Input Section */}
        <div className="flex flex-wrap items-center pt-4 md:pt-0 sessionpos">
          <h6 className="xl:text-22 productstepper pr-3 text-sm font-extrabold text-primary md:pl-8 md:text-base">
            SESSION:
          </h6>
          <div className="flex">
            {["morning", "afternoon", "evening"].map((session) => (
              <div key={session} className="mr-4 inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor={session}
                >
                  <input
                    id={session}
                    type="checkbox"
                    name={session}
                    checked={selectedSessions[session]}
                    onChange={handleSessionChange}
                    className="bg-light-gray border-light-gray checked:border-secondary checked:bg-secondary peer h-5 w-5 cursor-pointer appearance-none border transition-all hover:shadow-md sessioninput"
                    required
                  />
                  <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="xl:text-20 productsitem text-sm md:text-base"
                  htmlFor={session}
                >
                  {session === "morning" && "MORNING"}
                  {session === "afternoon" && "AFTERNOON"}
                  {session === "evening" && "EVENING (16.00-18.00)"}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateAndTimePicker;
