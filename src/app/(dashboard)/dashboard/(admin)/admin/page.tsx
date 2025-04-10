import React from "react";
import { generateSeo } from "~/utils";

// utils
import { checkAuth_server } from "~/utils/actions/checkAuth_server";

export const generateMetadata = () =>
  generateSeo({
    title: "Admin Dashboard",
    description: "A multivendor marketplace for electronic vendors.",
    url: "/dashboard/admin",
  });

const AdminDashboard: React.FC = async () => {
  await checkAuth_server({
    redirectTo: "/login",
    role: "Admin",
  });

  return (
    <main className="min-h-screen w-full justify-center p-5 pt-[70px]">
      <h1 className="text-base font-semibold">Dashboard</h1>
    </main>
  );
};

export default AdminDashboard;
