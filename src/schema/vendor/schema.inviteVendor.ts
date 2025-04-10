import z from "zod";

export const InviteVendorFormSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type InviteVendorFormValues = z.infer<typeof InviteVendorFormSchema>;
