import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import SessionWrapper from "@/components/SessionWrapper";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Saptiva GenAI",
  title: "Lab 🧪",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as any;
  const headerList = headers();
  console.log("headerList", headerList);
  const path = headerList.get("x-forwarded-path");
  console.log("path", path);

  console.log("session", session);

  /*if (!session) {
    redirect("/login?redirect=" + path);
  }*/

  return (
    /**
     * The following suppression warning was added because
     * of next-themes.
     *
     * This property only applies one level deep, so it won't block hydration warnings on other elements.
     *
     * @link https://nextui.org/docs/customization/dark-mode#using-next-themes
     * @link https://github.com/pacocoursey/next-themes
     */
    <SessionWrapper>
      <html lang='en' className='dark' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>

  )

}
