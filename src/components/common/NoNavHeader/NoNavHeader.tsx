import React from "react";
import Link from "next/link";

export const NoNavHeader: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[150px] py-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        Amaze Soft Technologies
      </Link>
      <section className="flex items-center gap-2">
        <Link href="/" className="text-primary/70 text-sm">
          support@amazesoft.com
        </Link>
      </section>
    </header>
  );
};
