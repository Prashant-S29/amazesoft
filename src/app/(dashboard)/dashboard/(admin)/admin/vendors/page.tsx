import React from "react";
import Link from "next/link";

// icons
import { AddIcon } from "~/icons";

// components
import { InviteVendorDialog } from "~/components/admin/feature";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

const Vendors: React.FC = async () => {
  // mutations
  const { data: allVendors } = await api.admin.getAllVendors();

  return (
    <main className="bg-accent flex min-h-screen w-full flex-col gap-3 p-5 pt-[70px]">
      <section className="flex w-full items-center justify-between">
        <h1 className="text-base font-semibold">Vendors</h1>

        <section className="flex items-start gap-1">
          <InviteVendorDialog
            trigger={
              <Button size="sm" variant="outline">
                Invite Vendors
              </Button>
            }
          />
          <Button size="sm" variant="outline">
            Import from CSV
          </Button>
          <Button size="sm" className="h-[30px]" asChild>
            <Link href="/dashboard/admin/vendors/new">
              <AddIcon /> Add Vendor
            </Link>
          </Button>
        </section>
      </section>

      {/* all vendors */}
      <section>
        {allVendors ? (
          <section>{JSON.stringify(allVendors)}</section>
        ) : (
          <section>no vendors</section>
        )}
      </section>
    </main>
  );
};

export default Vendors;
