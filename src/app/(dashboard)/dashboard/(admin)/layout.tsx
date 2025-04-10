import "~/styles/globals.css";

// font
import { fonts } from "~/fonts";

// auth
import { auth } from "~/server/auth";

// utils
import { generateSeo, Providers } from "~/utils";
import { Header } from "~/components/admin/layout";

// components
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/admin/layout";

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

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${fonts.montserrat.className}`}>
      <body>
        <SidebarProvider>
          <Providers session={session}>
            <Header />
            <AppSidebar />
            <main className="flex w-full">
              {/* <SideMenu /> */}
              {children}
            </main>
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
