import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ScrollMotion } from "./components/scroll-motion";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maritribe.one"),
  title: "maritribeOne",
  description: "maritime media, learning, and reviewer workspace",
  openGraph: {
    title: "maritribeOne",
    description: "maritime media, learning, and reviewer workspace",
    url: "https://maritribe.one",
    type: "website",
    images: ["/og-preview.png"],
  },
  twitter: {
    card: "summary",
    title: "maritribeOne",
    description: "maritime media, learning, and reviewer workspace",
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body>
        {children}
        <ScrollMotion />
      </body>
    </html>
  );
}
