import Image from "next/image";
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

  // eslint-disable-next-line multiline-comment-style
  if (!session) {
    redirect(`/login?redirect=${path || "/lab/toolhub"}`);
  }

  const ImageProfile = session.user.image;

  return (
    <SessionWrapper>
      <html lang='en' className='dark' suppressHydrationWarning>
        <body className={inter.className}>
          <nav className='dark:bg-content1-900 border-gray-200 bg-content1'>
            <div className='max-w-screen-full mx-auto flex flex-wrap items-center justify-between p-3'>
              <a
                href='#'
                className='flex items-center space-x-3 rtl:space-x-reverse'
              >
                <Image
                  className='mx-auto items-center justify-center'
                  src='/img/saptiva-t.png'
                  alt='saptiva'
                  width={100}
                  height={200}
                />
              </a>
              <div
                className='hidden w-full md:block md:w-auto'
                id='navbar-default'
              ></div>
            </div>
          </nav>

          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
