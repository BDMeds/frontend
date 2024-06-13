import { GiMedicines } from "react-icons/gi";

const SidebarSkeleton = () => {
  return (
    <>
      <div>
        <div className="pl-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <GiMedicines className="text-primary" />
            <span className="font-bold">BDMeds</span>
          </div>
        </div>

        <div className="mt-5 space-y-4 px-4">
          {Array.from({ length: 5 }).map((_, id) => (
            <div key={id} className="space-y-1">
              <ul className="space-y-2">
                <li className="p-4 w-full animate-skeleton rounded-lg"></li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 py-4 px-8">
        {Array.from({ length: 2 }).map((_, id) => (
          <div key={id} className="space-y-1">
            <ul className="space-y-2">
              <li className="p-4 w-full animate-skeleton rounded-lg"></li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SidebarSkeleton;
