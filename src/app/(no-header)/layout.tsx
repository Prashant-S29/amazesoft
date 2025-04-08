import "~/styles/globals.css";

// font
import { fonts } from "~/fonts";

// auth
import { auth } from "~/server/auth";

// utils
import { generateSeo, Providers } from "~/utils";

export const generateMetadata = () =>
  generateSeo({
    title: {
      template: "%s | Amaze Soft Technologies",
      default:
        "Amaze Soft Technologies | A multivendor marketplace for electronic vendors",
    },
    description: "A multivendor marketplace for electronic vendors.",
    url: "/vendor/join",
  });

export default async function NoHeaderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${fonts.montserrat.className}`}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
