import "~/styles/globals.css";

// font
import { fonts } from "~/fonts";

// auth
import { auth } from "~/server/auth";

// utils
import { generateSeo, Providers } from "~/utils";

// components
import { NoNavHeader } from "~/components/common";

export const generateMetadata = () =>
  generateSeo({
    title: {
      template: "%s | Amaze Soft Technologies",
      default:
        "Amaze Soft Technologies | A multivendor marketplace for electronic vendors",
    },
    description: " A multivendor marketplace for electronic vendors.",
    url: "/",
  });

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${fonts.montserrat.className}`}>
      <body>
        <Providers session={session}>
          <NoNavHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
