import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Spline_Sans } from "next/font/google";
import { CustomCursor } from "./components/CustomCursor";
import { HeadingMotion } from "./components/HeadingMotion";
import { ScrollToTop } from "./components/ScrollToTop";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Abdul Moiz | Team-Led Digital Services",
  description: "Abdul Moiz leads a collaborative team offering web development, custom software development, cybersecurity, SEO, logo design, and graphic design.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${splineSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <CustomCursor />
        <HeadingMotion />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
