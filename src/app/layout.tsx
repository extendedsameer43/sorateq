import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SORATEq - Automation Solutions for Your Business",
  description: "Transform your business with AI-powered automation solutions. Build websites, implement AI, reduce operational costs, and streamline repetitive tasks.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        sizes: "16x16",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        className={`${varelaRound.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
