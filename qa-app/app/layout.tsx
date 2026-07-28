import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
