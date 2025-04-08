import React from "react";
import { auth } from "~/server/auth";

const Home: React.FC = async () => {
  const session = await auth();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1>Multi Vendor Marketplace</h1>
      <p>{JSON.stringify(session)}</p>
    </main>
  );
};

export default Home;
