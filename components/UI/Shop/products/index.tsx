"use client";

import Product from "./product";

const MedicinesDisplay = () => {
  return (
    <div className="container grid grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, id) => (
        <Product key={id} id={id} />
      ))}
    </div>
  );
};

export default MedicinesDisplay;
