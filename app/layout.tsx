import type { Metadata } from "next";
import { Geist_Mono, Kanit } from "next/font/google";

import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { PageViewTracker } from "@/components/layout/page-view-tracker";
import { getBaseUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "600", "700"],
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
    <html lang="th" className={`${kanit.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white">
        <PageViewTracker />
        <div className="flex min-h-full flex-col bg-white">
          <LayoutWrapper>{children}</LayoutWrapper>
        </div>
      </body>
    </html>
  );
}
