import type { z } from "zod";
import type { UserSignupSchema } from "~/schema/user/schema.usersignup";

export const defaultValues: z.infer<typeof UserSignupSchema> = {
  name: "",
  email: "",
  password: "",
};
