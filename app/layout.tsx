import type { Metadata } from "next";
import "./globals.css";

import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar"; // Import the Navbar
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HealIntel",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Appointments', href: '/new-appointment' },
  
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar /> 
        <ThemeProvider attribute="class" defaultTheme="dark">
          
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
