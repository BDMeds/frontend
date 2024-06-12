"use client";

const WhyUs = () => {
  return (
    <section>
      <div className="container my-20">
        <div className="flex items-center gap-20 justify-center flex-wrap">
          {Array.from({ length: 5 }).map((_, id) => (
            <div
              key={id}
              className="p-4 space-y-4 bg-white border rounded-lg border-gray-200 max-w-[20rem] duration-300 hover:shadow-2xl"
            >
              <div className="size-10 border rounded-lg"></div>

              <p className={`font-extrabold text-2xl`}>Heading {id + 1}</p>

              <p className="text-gray-800">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequatur in enim ducimus id fugiat
                illum, illo quaerat similique expedita animi quas vitae,
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
