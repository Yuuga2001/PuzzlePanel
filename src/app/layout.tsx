import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "パズルパネル",
  description: "古代エジプトの石板をモチーフにしたパズルゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-background text-white`}>
        {children}
      </body>
    </html>
  );
}
