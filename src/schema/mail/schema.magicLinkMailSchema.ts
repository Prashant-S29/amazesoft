import { z } from "zod";

export const MagicLinkMailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mail: z.string().email("Invalid email"),
  signUpLink: z.string().url("Invalid URL"),
});
