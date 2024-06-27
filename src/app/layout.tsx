import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import SessionWrapper from "@/components/SessionWrapper";

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
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
