import { Geist, Geist_Mono } from "next/font/google";
import ToasterProvider from "./components/ToasterProvider";
import Navigation from "./components/Navigation";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        <ToasterProvider>
          <Navigation />
          {children}
        </ToasterProvider>
      </body>
    </html>
  );
}
