import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { AudioPlayerProvider } from "@/lib/audio-player-context";
import MiniPlayer from "@/components/sermons/MiniPlayer";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Enoch's Outpost Ministry | Looking unto Jesus",
  description:
    "Preparing a people for the soon coming of Christ. Explore Bible studies, sermons, health resources, and eBooks from Enoch's Outpost Ministry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <AudioPlayerProvider>
          <SiteChrome>{children}</SiteChrome>
          <MiniPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
