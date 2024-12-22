import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IstanbulEbeveyn",
  description: "Çocuklarınızı veya arkadaşlarınızı takip edebilmenizi sağlar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
