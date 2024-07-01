import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "../../(lab)/lab/providers";
import React from "react";
import SessionWrapper from "@/components/SessionWrapper";
import { authOptions } from "../../../../lib/authOptions";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  const path = headerList.get("x-forwarded-path");

  if (!session) {
    redirect(`/login?redirect=${path || "/lab/toolhub"}`);
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
