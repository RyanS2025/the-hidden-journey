import type { Metadata } from "next";
import "@/styles/globals.css";
import { Caveat, Playfair_Display, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "The Hidden Journey — Where Your Stuff Really Comes From",
  description:
    "Trace the global supply chains and carbon footprints behind everyday Girl Scout products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        caveat.variable,
        playfair.variable,
        dmSans.variable,
      )}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
