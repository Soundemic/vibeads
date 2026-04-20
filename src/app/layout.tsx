import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title:       "Vibeads — AI Video Studio",
  description: "Turn any link into a viral video in 60 seconds. Powered by AI.",
  keywords:    ["AI video", "link to video", "TikTok automation", "n8n", "video generation"],
  openGraph: {
    title:       "Vibeads — AI Video Studio",
    description: "Turn any link into a viral video in 60 seconds.",
    type:        "website",
    siteName:    "Vibeads",
  },
  twitter: {
    card:  "summary_large_image",
    title: "Vibeads — AI Video Studio",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${dmMono.variable} bg-surface-0 font-display text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
