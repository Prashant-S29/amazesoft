import React, { Suspense } from "react";
import Link from "next/link";

// icons
import { AddIcon } from "~/icons";

// utils
import { checkAuth_server } from "~/utils/actions/checkAuth_server";

// components
import { InviteVendorDialog, VendorTable } from "~/components/admin/feature";
import { Button } from "~/components/ui/button";

const Vendors: React.FC = async () => {
  await checkAuth_server({
    redirectTo: "/login",
    role: "Admin",
  });

  return (
    <main className="flex min-h-screen w-full flex-col gap-3 p-5 pt-[70px]">
      <section className="flex w-full items-center justify-between">
        <h1 className="text-base font-semibold">Vendors</h1>

        <section className="flex items-start gap-1">
          <InviteVendorDialog
            trigger={
              <Button size="sm" variant="secondary">
                Invite Vendors
              </Button>
            }
          />
          <Button size="sm" variant="secondary">
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
      <Suspense fallback={<div>Loading...</div>}>
        <VendorTable />
      </Suspense>
    </main>
  );
};

export default Vendors;
