"use client";

import { services } from "@/lib/data/home";

const Services = () => {
  return (
    <section>
      <div className="container my-20">
        <div className="grid grid-cols-3 gap-10 justify-center flex-wrap">
          <div className="space-y-3 p-5">
            <p className="text-lg">Services</p>
            <p className="font-extrabold text-4xl">Provides Our Best Services</p>
          </div>
          {services.map(({ description, icon, title }, id) => (
            <div
              key={id}
              className="px-5 py-7 space-y-4 bg-white shadow-lg shadow-gray-100 rounded-xl duration-300 hover:shadow-2xl"
            >
              <div className="size-12 border rounded-full bg-primary text-white grid place-content-center">{icon}</div>

              <p className={`font-extrabold text-2xl`}>{title}</p>

              <p className="text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
