import React from "react";

// utils
import { checkAuth_server } from "~/utils/actions/checkAuth_server";

const AdminDashboard: React.FC = async () => {
  await checkAuth_server({
    redirectTo: "/login",
    role: "Admin",
  });

  return (
    <main className="bg-accent min-h-screen w-full justify-center p-5 pt-[70px]">
      <h1 className="text-base font-semibold">Dashboard</h1>
    </main>
  );
};

export default AdminDashboard;
