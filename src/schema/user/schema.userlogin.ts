import z from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type UserLoginSchemaFormValues = z.infer<typeof UserLoginSchema>;
