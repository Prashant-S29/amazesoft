"use client";

import React, { useState } from "react";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { InviteVendorForm } from "../../forms";

interface InviteVendorDialogProps {
  trigger: React.ReactNode;
}

export const InviteVendorDialog: React.FC<InviteVendorDialogProps> = ({
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a Vendor</DialogTitle>
          <DialogDescription className="-mt-1">
            Invite a vendor in your marketplace.
          </DialogDescription>
        </DialogHeader>
        <InviteVendorForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
