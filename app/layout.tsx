import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { googleSiteVerification, siteUrl } from "./site";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "2026は令和8年です | Japanese Era Converter",
  description: "Instant Convert Western years to Japanese Eras including Reiwa, Heisei, Showa, Taisho, and Meiji.showa,taisho,and meiji.",
  alternates: {
    canonical: "/",
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: "dJLNcwHH5xFALJcizDZ-IyS3v-ubCOv0c-cCjV39Mm0",
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
