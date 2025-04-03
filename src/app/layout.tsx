import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import localFont from 'next/font/local'
import "./globals.css";
import Header from "@/components/Header";

const gotham = localFont({
  src: [
    {
      path: '../../public/fonts/Gotham/Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gotham/Gotham-BookItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gotham/Gotham-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gotham/Gotham-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: "swap",
  variable: "--font-gotham"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gotham.variable} antialiased bg-[#]`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
