import React from "react";
import { checkAuth_server } from "~/utils/actions/checkAuth_server";

const AddNewVendor: React.FC = async () => {
  await checkAuth_server({
    redirectTo: "/login",
    role: "Admin",
  });
  return (
    <main className="bg-accent min-h-screen w-full justify-center p-5 pt-[70px]">
      <h1 className="text-base font-semibold">Add a new Vendor</h1>
    </main>
  );
};

export default AddNewVendor;
