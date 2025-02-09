import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setOrdertype, setSession } from "../../redux/productsSlice";

const Ordertype = () => {

  const dispatch = useDispatch();
    const { date, session } = useSelector((state: RootState) => state.products);
  
    const [selectedOrdertype, setSelectedOrdertype] = useState({
      pickup: false,
      drop: false,
    });
  
    const handleOrdertypeChange = (e) => {
      const { name, checked } = e.target;
      if (checked) {
        // Uncheck all other sessions and only check the clicked session
        setSelectedOrdertype({
          pickup: false,
          drop: false,
          [name]: true,
        });
  
        // Dispatch the session update to Redux
        dispatch(setOrdertype({
          pickup: name === "pickup",
          drop: name === "drop",
        }));
      } else {
        // Uncheck the session
        setSelectedOrdertype({
          ...selectedOrdertype,
          [name]: false,
        });
  
        // Dispatch the session update to Redux
        dispatch(setOrdertype({
            pickup: name === "pickup",
            drop: name === "drop",
        }));
      }
    };
    // const handleDateChange = (e) => {
    //   const { name, value } = e.target;
    //   const newDate = { ...date, [name]: value };
    //   dispatch(setDate(newDate));
    // };
    return ( 
        <div className="flex flex-wrap items-center pt-4 md:pt-0 sessionpos">
          <h6 className="xl:text-22 productstepper pr-3 text-sm font-extrabold text-primary md:pl-8 md:text-base">
           Order TYPE:
          </h6>
          <div className="flex">
            {["pickup", "drop"].map((ordertype) => (
              <div key={ordertype} className="mr-4 inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor={ordertype}
                >
                  <input
                    id={ordertype}
                    type="checkbox"
                    name={ordertype}
                    checked={selectedOrdertype[ordertype]}
                    onChange={handleOrdertypeChange}
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
                  htmlFor={ordertype}
                >
                  {ordertype === "pickup" && "PICKUP"}
                  {ordertype === "drop" && "DROP"}

                </label>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Ordertype;