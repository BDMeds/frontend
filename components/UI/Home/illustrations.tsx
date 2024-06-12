const Illustrations = () => {
  return (
    <>
      <section>
        <div className="container grid grid-cols-2 gap-5 my-32">
          <div className="border border-gray-200 bg-white rounded-lg min-h-[40rem]"></div>
          <div className="grid gap-5">
            {Array.from({ length: 3 }).map((_, id) => (
              <div key={id} className="p-4 space-y-4 border rounded-lg border-gray-200 bg-white "></div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container grid grid-cols-2 gap-5 my-32">
          <div className="grid gap-5">
            {Array.from({ length: 3 }).map((_, id) => (
              <div key={id} className="p-4 space-y-4 border rounded-lg border-gray-200 bg-white "></div>
            ))}
          </div>

          <div className="border border-gray-200 bg-white rounded-lg min-h-[40rem]"></div>
        </div>
      </section>
    </>
  );
};

export default Illustrations;
