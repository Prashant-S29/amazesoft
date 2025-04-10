// trpc
import { createTRPCRouter } from "../trpc";
import { env } from "~/env";
import { protectedProcedure } from "~/server/api/middleware/middleware.protected";

// schema
import { VendorInvitationMailSchema } from "~/schema/mail";

// types
import { type SendMailOptions } from "nodemailer";

// react mail components
import { render } from "@react-email/components";

// utils
import { transporter } from "~/utils/mail/mail";
import { VendorInvitationMail } from "~/utils/mail/template";

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
