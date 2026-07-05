import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "maritribeOne",
  description: "maritime media, learning, and reviewer workspace",
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
