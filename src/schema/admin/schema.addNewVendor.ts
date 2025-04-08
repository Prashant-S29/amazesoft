import { z } from "zod";

export const AddNewVendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  taxNumber: z.string().min(1, "Tax Number is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
});

export type AddNewVendorSchemaFormValues = z.infer<typeof AddNewVendorSchema>;
