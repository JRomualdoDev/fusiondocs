import type { Metadata } from "next";
import { ThemeProvider } from "./theme/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./components/sidebar/page";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jornada Dev Junior - FusionDocs",
  description: "Começando a jornada do dev Junior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="inline-flex w-full">

            {/* <Sidebar menus={sideMenu}/> */}
            <Sidebar />
            <div className="flex flex-col w-full h-full items-center">
              {children}
            </div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
