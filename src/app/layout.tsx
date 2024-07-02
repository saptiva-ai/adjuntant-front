"use client";

import "./globals.css";

import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Import Flowbite scripts dynamically
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js";
    script.async = true;

    document.head.appendChild(script);

    // Cleanup when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <SessionWrapper>
      <html lang='en' className='dark' suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
