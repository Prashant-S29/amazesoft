import React from "react";

// trpc
import { api } from "~/trpc/server";

export const VendorTable: React.FC = async () => {
  const { data: allVendors } = await api.admin.getAllVendors();

  return (
    <section>
      {allVendors ? (
        <section>{JSON.stringify(allVendors)}</section>
      ) : (
        <section>no vendors</section>
      )}
    </section>
  );
};
