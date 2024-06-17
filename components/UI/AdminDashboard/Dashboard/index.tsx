"use client";

import AdminCards from "./cards";
import UsersBarChart from "./charts/users-bar-chart";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <AdminCards />

      <div className="grid grid-cols-3">
        <div className="bg-white col-span-2 p-4 border rounded-xl h-[30rem] space-y-5">
          <p className="font-bold text-xl">Users</p>

          <UsersBarChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
