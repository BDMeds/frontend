"use client";

import Image from "next/image";

const Partners = () => {
  return (
    <section className="space-y-8 py-10 container">
      <h4 className="text-center text-2xl font-bold text-primary">Our Partners</h4>

      <div className="sm:flex grid grid-cols-3 items-center gap-14 flex-wrap justify-center">
        {Array.from({ length: 8 }).map((_, id) => (
          <Image src={`/images/partners/partner${id + 1}.png`} alt="partner" key={id} width={200} height={200} />
        ))}
      </div>
    </section>
  );
};

export default Partners;
