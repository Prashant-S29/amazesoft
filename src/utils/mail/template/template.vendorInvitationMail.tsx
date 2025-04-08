import * as React from "react";

// assets
import { logo } from "public/assets";

// zod
import type { z } from "zod";

// types
import type { VendorInvitationMailSchema } from "~/schema/mail";

// components
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { env } from "~/env";

export function VendorInvitationMail({
  senderName,
  invitationLink,
}: z.infer<typeof VendorInvitationMailSchema>) {
  const previewText = "Join Marketplace at Amaze Soft Technologies";

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={logo.src}
                width="40"
                height="40"
                alt="Amaze Soft Technologies"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join Marketplace at <strong>Amaze Soft Technologies</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {senderName} ({env.EMAIL_USER}) from{" "}
              <strong>Amaze Soft Technologies</strong> has invited you to their
              marketplace.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={invitationLink}
              >
                Join the Marketplace
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={invitationLink}
                className="text-blue-600 no-underline"
              >
                {invitationLink}
              </Link>
            </Text>

            <Hr className="mx-0 my-[16px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation will expire in 24 hours. If you were not expecting
              this email, you can ignore this email. If you are concerned about
              your account&apos;s safety, please reply to this email to get in
              touch with us.
            </Text>

            <Hr className="mx-0 my-[16px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              © 2024 | Amaze Soft Technologies | www.amazesoft.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
