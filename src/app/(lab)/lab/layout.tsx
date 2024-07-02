import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/navBar";
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
      <div>
        <Providers>
          <NavBar session={session} />
          <main className='h-full p-1'>{children}</main>
        </Providers>
      </div>
    </SessionWrapper>
  );
}
