import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeList",
  description: "Website Anime Indonesia",
};

import { ThemeProviders } from "@/components/Navbar/Theme-provider";

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-[#1e1e1e] text-black dark:text-[#e0e0e0] ${inter.className}`}>
        <ThemeProviders>
          <div>
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
