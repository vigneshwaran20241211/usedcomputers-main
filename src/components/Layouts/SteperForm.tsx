"use client";
import '@/css/input1.css';
import '@/css/output.css';
import Book from "@/components/Layouts/Book";
import Confirm from "@/components/Layouts/Confirm";
import Earncash from "@/components/Layouts/Earncash";
import Welldone from '@/components/Layouts/Welldone';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from '@/redux/store';

const StepperForm = () => {
  const { date, session ,ordertype } = useSelector((state: RootState) => state.products);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    item: '',
    qty: '',
    date: '',
    session: '',
    ordertype: '',
  });

  const selectedData = useSelector((state: any) => state.products.selectedData);

  const totalItems = selectedData.reduce((total, category) => {
    return total + category.products.reduce((productTotal, product) => productTotal + product.quantity, 0);
  }, 0);

  const handleNext = () => {
    if (step == 1) {
      if (totalItems > 0) {
        if (date.date && date.month && date.year) {
          console.log(session)
          if (session.afternoon || session.evening || session.morning) {
            setStep(step + 1);
          } else {
            toast.error("Please select session !", { position: "top-right" });
          }
        } else {
          toast.error("Please select correct date !", { position: "top-right" });
        }
      } else {
        toast.error("Please select product !", { position: "top-right" });
      }
    } 
    else if(step == 2)
    {
      if (ordertype.pickup || ordertype.drop) {
        setStep(step + 1);
      } else {
        toast.error("Please select Order Type !", { position: "top-right" });
      }
    }
    else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (if needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here if required
    setStep(step + 1); // Move to next step (Step 4)
  };

  return (
    <>
      <div className="form-wizard">
        <style jsx>{`
          @media (min-width: 768px) {
            .btn-stp {
              float: right;
              margin-left: auto;
            }
          }
        `}</style>
        <form onSubmit={handleSubmit} className="m-[30px]">
          {/* Render each step dynamically */}
          {step === 1 && <Book formData={formData} onChange={handleInputChange} />}
          {step === 2 && <Confirm formData={formData} onChange={handleInputChange} />}
          {step === 3 && <Earncash formData={formData} onChange={handleInputChange} />}
          {step === 4 && <Welldone formData={formData} onChange={handleInputChange} />}

          {/* Buttons to navigate between steps */}
          <div className="buttons btn-stp">
            {step > 1 && step < 4 && (
              <button
                type="button"
                className="uppercase bg-secondary text-white py-1 lg:py-1.5 px-6 lg:px-12 font-extrabold text-20 lg:text-24 rounded ml-[-25px]"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="uppercase bg-secondary text-white py-1 lg:py-1.5 px-6 lg:px-12 font-extrabold text-20 lg:text-24 rounded ml-10"
                onClick={handleNext}
              >
                Proceed
              </button>
            )}
            {/* {step === 3 && (
              <button
                className="uppercase bg-secondary text-white py-1 lg:py-1.5 px-6 lg:px-12 font-extrabold text-20 lg:text-24 rounded ml-10"
                type="submit"
              >
                Submit
              </button>
            )} */}
            {step === 3 && (
              // The submit button will no longer be shown at step 3
              <button
                className="uppercase bg-secondary text-white py-1 lg:py-1.5 px-6 lg:px-12 font-extrabold text-20 lg:text-24 rounded ml-10"
                type="submit"
                style={{ display: 'none' }}  // You can use CSS if needed
              >
                Submit
              </button>
            )}
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default StepperForm;
