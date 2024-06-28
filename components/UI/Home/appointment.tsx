"use client";

import Button from "@/components/Common/Button";
import { toastError } from "@/lib/utils/toast";
import { useRef } from "react";
import { CgChevronRight } from "react-icons/cg";

const Appointment = () => {
  return (
    <section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#5e2bff"
          fillOpacity="1"
          d="M0,128L120,154.7C240,181,480,235,720,234.7C960,235,1200,181,1320,154.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>

      {/*  */}
      <div className="lg:min-h-[30rem] min-h-[45rem] bg-primary relative text-white grid place-content-center py-10 md:py-0">
        <div className="container space-y-6">
          <div className="space-y-4 text-center">
            <h3 className="font-extrabold sm:text-5xl text-4xl">Book an Appointment</h3>
            <p className="text-lg">Book an appointment with us today and get the best healthcare services.</p>
          </div>

          {/* form */}
          <form onSubmit={(e) => (e.preventDefault(), toastError("Feature coming soon"))} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName" className="font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName" className="font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="font-bold">
                Reason for Appointment
              </label>
              <input
                type="text"
                placeholder="e.g Eye test, Dental checkup, etc."
                className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phoneNumber" className="font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="preferredDate" className="font-bold">
                  Preferred Date
                </label>
                <input type="date" className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full" />
              </div>
              <div className="space-y-1">
                <label htmlFor="preferredTime" className="font-bold">
                  Preferred Time
                </label>
                <input
                  type="tel"
                  placeholder="10 AM, 2 PM, etc."
                  className="p-4 bg-white bg-opacity-20 placeholder:text-white/80 rounded-lg w-full"
                />
              </div>
            </div>

            <Button
              text="Submit"
              icon={<CgChevronRight />}
              className="border-none ring-[2px] ring-white hover:bg-white hover:text-primary text-white"
              fullWidth
            />
          </form>
        </div>
      </div>

      {/*  */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319" className="-mt-20">
        <path
          fill="#5e2bff"
          fillOpacity="1"
          d="M0,256L120,266.7C240,277,480,299,720,304C960,309,1200,299,1320,293.3L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default Appointment;
