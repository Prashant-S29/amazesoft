"use client";

import React from "react";

// zod and RHF
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// types
import {
  InviteVendorFormSchema,
  type InviteVendorFormValues,
} from "~/schema/vendor/schema.inviteVendor";

// components
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { toast } from "sonner";

interface InviteVendorFormProps {
  setOpen?: (open: boolean) => void;
}

export const InviteVendorForm: React.FC<InviteVendorFormProps> = ({
  setOpen,
}) => {
  // form
  const form = useForm<InviteVendorFormValues>({
    resolver: zodResolver(InviteVendorFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // mutation
  const inviteVendorMutation = api.admin.inviteVendor.useMutation();

  const onSubmit = async (data: InviteVendorFormValues) => {
    console.log("data", data);

    const res = await inviteVendorMutation.mutateAsync(data);

    if (!res.data?.email) {
      toast.error(res.message);
      form.reset();
      setOpen?.(false);
      return;
    }

    toast.success(res.message);

    form.reset();
    setOpen?.(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    {...field}
                    placeholder="Vendor Email"
                    disabled={form.formState.isSubmitting}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    {...field}
                    placeholder="Vendor Dashboard Password"
                    disabled={form.formState.isSubmitting}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p>A vendor can update their password once they have been invited.</p>

        <div className="flex justify-end gap-2">
          <Button type="submit" loading={form.formState.isSubmitting} size="sm">
            Send Invitation
          </Button>
        </div>
      </form>
    </Form>
  );
};
