import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { PageViewTracker } from "@/components/layout/page-view-tracker";
import { getBaseUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "SATITER",
    template: "%s | SATITER",
  },
  description: "Personal blog by SATITER",
  openGraph: {
    type: "website",
    siteName: "SATITER",
    title: "SATITER",
    description: "Personal blog by SATITER",
  },
  twitter: {
    card: "summary_large_image",
    title: "SATITER",
    description: "Personal blog by SATITER",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-[15px] leading-[1.6] text-gray-700">
        <PageViewTracker />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
