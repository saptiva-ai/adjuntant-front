import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "../../(lab)/lab/providers";
import SessionWrapper from "@/components/SessionWrapper";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Lab 🧪",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as any;
  const headerList = headers();
  const path = headerList.get("x-forwarded-path");

  if (!session) {
    redirect("/login?redirect=" + path);
  }

  return (
    <SessionWrapper>
      <html lang='en' className='dark' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
