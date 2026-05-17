import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Spacely — Experience Spaces Before You Step Into Them",
  description:
    "Spacely transforms property discovery with immersive 3D walkthroughs, intelligent commute simulation, and spatial experiences designed for modern renters. Launching first in Hyderabad.",
  keywords:
    "spatial discovery, immersive property, 3D walkthrough, rental platform, commute simulation, Hyderabad rentals",
  openGraph: {
    title: "Spacely — Experience Spaces Before You Step Into Them",
    description:
      "The future of spatial property discovery. Immersive 3D walkthroughs and intelligent commute simulation.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#0B0B0F" />
      </head>
      <body className="bg-[#0B0B0F] text-white font-[var(--font-inter)] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
