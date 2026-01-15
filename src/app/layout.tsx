import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://puzzlepanel.riverapp.jp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Puzzle Panel",
    default: "Puzzle Panel (パズルパネル) - A Brain-Teasing Board Game",
  },
  description: "A brain-teasing puzzle game with an ancient Egyptian theme. Flip the stone panels to match the target pattern in a set number of moves. | シンプルで奥深いロジカルパズルゲーム。石板を反転させ、規定回数内に目標の模様を完成させよう。",

  // Keywords
  keywords: [
    "パズルゲーム", "puzzle game", "ロジックパズル", "logic puzzle",
    "脳トレ", "brain teaser", "無料ゲーム", "free game",
    "ブラウザゲーム", "browser game", "パズルパネル", "Puzzle Panel"
  ],

  // Icons
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (for Facebook, etc.)
  openGraph: {
    title: "Puzzle Panel (パズルパネル)",
    description: "A brain-teasing puzzle game with an ancient Egyptian theme. Can you solve the mystery?",
    url: siteUrl,
    siteName: "Puzzle Panel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Puzzle Panel Game Board",
      },
    ],
    locale: "ja_JP",
    alternateLocale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Puzzle Panel (パズルパネル) - A Brain-Teasing Board Game",
    description: "Flip the stone panels to match the target pattern in this logical puzzle game.",
    images: ["/og-image.png"],
  },

  // For multi-language support
  alternates: {
    canonical: "/",
    languages: {
      'ja': '/',
      'en': '/',
      'x-default': '/',
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // Author
  authors: [{ name: "Puzzle Panel Project" }],

  // PWA
  manifest: "/manifest.json",
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
