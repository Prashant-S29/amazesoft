import { z } from "zod";

export const VendorInvitationMailSchema = z.object({
  receiverMail: z.string().email("Invalid email"),
  senderName: z.string().min(1, "Name is required"),
  invitationLink: z.string().url("Invalid URL"),
});
