"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/FormElements/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/FormElements/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/FormElements/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/FormElements/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/FormElements/Switchers/SwitcherFour";
import SwitcherOne from "@/components/FormElements/Switchers/SwitcherOne";
import SwitcherThree from "@/components/FormElements/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/FormElements/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";


const FormElements = () => {
  return (
    <>
	  {/* Breadcrumb Component */}
      <Breadcrumb pageName="Collection Agent" />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
               Add Collection Agent
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First name"
                    type="text"
                    placeholder="Enter a name"
                    customClasses="w-full xl:w-1/2"
                  />

                  <InputGroup
                    label="Last name"
                    type="text"
                    placeholder="Enter your last name"
                    customClasses="w-full xl:w-1/2"
                  />
                </div>

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter Email address"
                  customClasses="mb-4.5"
                  required
                />

                <InputGroup
                  label="IC number"
                  type="text"
                  placeholder="Enter IC Number"
                  customClasses="mb-4.5"
                />
                <SelectGroupOne />

                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter Address"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
	</div>
    </>
  );
};

export default FormElements;
