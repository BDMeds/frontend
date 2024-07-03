"use client";

import AdminCards from "./cards";
import UsersPieChart from "./charts/user-pie-chart";
import UsersBarChart from "./charts/users-bar-chart";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <AdminCards />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-white/10 md:col-span-2 p-4 border dark:border-white/10 rounded-xl self-start h-[30rem] space-y-5">
          <p className="font-bold text-xl">Users</p>

          <UsersBarChart />
        </div>

        <div className="bg-white dark:bg-white/10 border dark:border-white/10 grid place-content-center rounded-xl p-5 self-start min-h-[30rem]">
          <div className="-mt-10">
            <UsersPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
