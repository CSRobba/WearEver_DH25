import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WearEver - Sustainable Fashion Exchange",
  description: "WearEver, WhenEver, Wear Whatever. Trade clothes money-free with AI-powered matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}