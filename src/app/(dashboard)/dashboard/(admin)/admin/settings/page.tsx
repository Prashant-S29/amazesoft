import React from "react";
import { checkAuth_server } from "~/utils/actions/checkAuth_server";

const Settings: React.FC = async () => {
  await checkAuth_server({
    redirectTo: "/login",
    role: "Admin",
  });

  return (
    <main className="min-h-screen w-full justify-center p-5 pt-[70px]">
      <h1 className="text-base font-semibold">Settings</h1>
    </main>
  );
};

export default Settings;
