import { protectedProcedure } from "~/server/api/middleware/middleware.protected";

import { type SendMailOptions } from "nodemailer";
import { transporter } from "~/utils/mail/mail";
import { render } from "@react-email/components";

import { VendorInvitationMail } from "~/utils/mail/template";
import { createTRPCRouter } from "../trpc";
import { VendorInvitationMailSchema } from "~/schema/mail";
import { env } from "~/env";

export const mailRouter = createTRPCRouter({
  sendVendorInvitationMail: protectedProcedure
    .input(VendorInvitationMailSchema)
    .mutation(async ({ input }) => {
      try {
        // html
        const html = await render(
          VendorInvitationMail({
            receiverMail: input.receiverMail,
            invitationLink: input.invitationLink,
            senderName: input.senderName,
          }),
        );

        // mail options
        const mailOptions: SendMailOptions = {
          from: env.EMAIL_USER,
          to: input.receiverMail,
          subject: "Join Marketplace at Amaze Soft Technologies",
          html,
        };

        const res = await transporter.sendMail(mailOptions);

        if (!res.messageId) {
          console.error("Failed to send email");
          return null;
        }

        return res;
      } catch (error) {
        console.error("Error sending invitation email:", error);
        return null;
      }
    }),
});
